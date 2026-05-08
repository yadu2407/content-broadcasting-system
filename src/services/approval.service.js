class ApprovalService {
  async approveContent(contentId) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true };
  }
  
  async rejectContent(contentId, reason) {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, rejectionReason: reason };
  }
}

export default new ApprovalService();