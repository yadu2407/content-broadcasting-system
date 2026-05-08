import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import useAuth from '../hooks/useAuth';
import contentService from '../services/content.service';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  subject: yup.string().required('Subject is required'),
  description: yup.string(),
  startTime: yup.string().required('Start time is required'),
  endTime: yup.string()
    .required('End time is required')
    .test('is-after', 'End time must be after start time', function(value) {
      const { startTime } = this.parent;
      if (!startTime || !value) return true;
      return new Date(value) > new Date(startTime);
    }),
  rotationDuration: yup.number().min(5, 'Minimum 5 seconds').max(300, 'Maximum 300 seconds')
});

const TeacherUpload = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { rotationDuration: 30 }
  });
  
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast.error('Only JPG, PNG, GIF files are allowed');
      return;
    }
    
    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error('File size must be less than 10MB');
      return;
    }
    
    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
  };
  
  const onSubmit = async (data) => {
    if (!file) {
      toast.error('Please select a file');
      return;
    }
    
    setLoading(true);
    try {
      const formData = {
        ...data,
        file: file,
        fileName: file.name,
        fileType: file.type,
        teacherId: user.id,
        teacherName: user.name
      };
      
      await contentService.uploadContent(formData);
      toast.success('Content uploaded successfully!');
      navigate('/teacher/my-content');
    } catch (error) {
      toast.error('Failed to upload content');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ background: 'white', borderRadius: '16px', padding: '28px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '600', marginBottom: '24px', color: '#1e293b' }}>
          Upload New Content
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
              Title *
            </label>
            <input
              type="text"
              {...register('title')}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }}
              placeholder="Enter content title"
            />
            {errors.title && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.title.message}</p>}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
              Subject *
            </label>
            <select
              {...register('subject')}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }}
            >
              <option value="">Select subject</option>
              <option value="Mathematics">Mathematics</option>
              <option value="Physics">Physics</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Biology">Biology</option>
              <option value="Computer Science">Computer Science</option>
              <option value="English">English</option>
              <option value="History">History</option>
            </select>
            {errors.subject && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.subject.message}</p>}
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
              Description
            </label>
            <textarea
              {...register('description')}
              rows="4"
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }}
              placeholder="Enter content description"
            ></textarea>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
              File * (JPG, PNG, GIF, max 10MB)
            </label>
            <input
              type="file"
              accept="image/jpeg,image/png,image/gif"
              onChange={handleFileChange}
              style={{ width: '100%', padding: '8px', border: '1px solid #e2e8f0', borderRadius: '10px' }}
            />
            {preview && (
              <div style={{ marginTop: '12px' }}>
                <img src={preview} alt="Preview" style={{ maxWidth: '160px', borderRadius: '10px' }} />
              </div>
            )}
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
                Start Time *
              </label>
              <input
                type="datetime-local"
                {...register('startTime')}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }}
              />
              {errors.startTime && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.startTime.message}</p>}
            </div>
            
            <div>
              <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
                End Time *
              </label>
              <input
                type="datetime-local"
                {...register('endTime')}
                style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }}
              />
              {errors.endTime && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.endTime.message}</p>}
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '6px', fontSize: '13px', color: '#334155' }}>
              Rotation Duration (seconds)
            </label>
            <input
              type="number"
              {...register('rotationDuration')}
              style={{ width: '100%', padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: '10px', fontSize: '14px' }}
              placeholder="30"
            />
            {errors.rotationDuration && <p style={{ color: '#ef4444', fontSize: '11px', marginTop: '4px' }}>{errors.rotationDuration.message}</p>}
          </div>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{ flex: 1, background: 'linear-gradient(135deg, #7c3aed, #a855f7)', color: 'white', padding: '10px', border: 'none', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
            >
              {loading ? 'Uploading...' : 'Upload Content'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/teacher/dashboard')}
              style={{ flex: 1, background: '#f1f5f9', color: '#334155', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '10px', fontWeight: '500', cursor: 'pointer' }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TeacherUpload;