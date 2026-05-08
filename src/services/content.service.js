let mockContents = [
  {
    id: '1', title: 'Introduction to React', subject: 'Computer Science', description: 'Basic concepts of React',
    fileUrl: 'https://via.placeholder.com/300x200?text=React+Preview', fileName: 'react-intro.jpg',
    startTime: new Date(Date.now() - 3600000).toISOString(), endTime: new Date(Date.now() + 7200000).toISOString(),
    rotationDuration: 30, status: 'approved', rejectionReason: null, teacherId: '1', teacherName: 'John Teacher'
  },
  {
    id: '2', title: 'Advanced JavaScript', subject: 'Programming', description: 'Deep dive into JavaScript',
    fileUrl: 'https://via.placeholder.com/300x200?text=JS+Preview', fileName: 'js-advanced.jpg',
    startTime: new Date(Date.now() + 86400000).toISOString(), endTime: new Date(Date.now() + 172800000).toISOString(),
    rotationDuration: 45, status: 'pending', rejectionReason: null, teacherId: '1', teacherName: 'John Teacher'
  }
];

class ContentService {
  async uploadContent(formData) {
    await new Promise(resolve => setTimeout(resolve, 1500));
    const newContent = {
      id: Date.now().toString(), ...formData,
      fileUrl: URL.createObjectURL(formData.file), status: 'pending', rejectionReason: null,
      teacherId: '1', teacherName: 'John Teacher', createdAt: new Date().toISOString()
    };
    mockContents.unshift(newContent);
    return { success: true, content: newContent };
  }
  
  async getTeacherContent(teacherId) {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, contents: mockContents.filter(c => c.teacherId === teacherId) };
  }
  
  async getAllContent(filters = {}) {
    await new Promise(resolve => setTimeout(resolve, 500));
    let contents = [...mockContents];
    if (filters.status && filters.status !== 'all') contents = contents.filter(c => c.status === filters.status);
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      contents = contents.filter(c => c.title.toLowerCase().includes(searchLower) || c.subject.toLowerCase().includes(searchLower));
    }
    return { success: true, contents };
  }
  
  async getPendingContent() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { success: true, contents: mockContents.filter(c => c.status === 'pending') };
  }
  
  async getLiveContent(teacherId) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const now = new Date();
    const liveContent = mockContents.find(c => c.teacherId === teacherId && c.status === 'approved' &&
      new Date(c.startTime) <= now && new Date(c.endTime) >= now);
    return { success: true, content: liveContent || null };
  }
  
  async getDashboardStats(teacherId) {
    const teacherContents = mockContents.filter(c => c.teacherId === teacherId);
    return {
      success: true,
      stats: {
        total: teacherContents.length,
        pending: teacherContents.filter(c => c.status === 'pending').length,
        approved: teacherContents.filter(c => c.status === 'approved').length,
        rejected: teacherContents.filter(c => c.status === 'rejected').length
      }
    };
  }
  
  async getPrincipalStats() {
    return {
      success: true,
      stats: {
        total: mockContents.length,
        pending: mockContents.filter(c => c.status === 'pending').length,
        approved: mockContents.filter(c => c.status === 'approved').length,
        rejected: mockContents.filter(c => c.status === 'rejected').length
      }
    };
  }
}

export default new ContentService();