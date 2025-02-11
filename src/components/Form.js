import React, { useState } from 'react';

const SocialMediaForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    instagramHandle: '',
    linkedinProfile: '',
    facebookPage: '',
    twitterHandle: '',
    stockImages: null,
    videos: null,
    socialMediaLogin: '', // Social Media Account Details
    logo: null,
    referenceLinks: '',
  });

  const [errors, setErrors] = useState({});
  const [fileStatus, setFileStatus] = useState({
    stockImages: '',
    videos: '',
    logo: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData({ ...formData, [name]: files[0] });
    setFileStatus({ ...fileStatus, [name]: files[0]?.name || 'File selected' });
  };

  const validateStep1 = () => {
    const currentErrors = {};
    if (!formData.companyName.trim()) {
      currentErrors.companyName = 'Company Name is required';
    }
    if (!formData.instagramHandle.trim()) {
      currentErrors.instagramHandle = 'Instagram Handle is required';
    }
    if (!formData.linkedinProfile.trim()) {
      currentErrors.linkedinProfile = 'LinkedIn Profile is required';
    }
    if (!formData.facebookPage.trim()) {
      currentErrors.facebookPage = 'Facebook Page is required';
    }
    if (!formData.twitterHandle.trim()) {
      currentErrors.twitterHandle = 'Twitter Handle is required';
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const validateStep2 = () => {
    const currentErrors = {};
    if (!formData.stockImages) {
      currentErrors.stockImages = 'Stock Images are required';
    }
    if (!formData.videos) {
      currentErrors.videos = 'Video Upload is required';
    }
    if (!formData.logo) {
      currentErrors.logo = 'Logo is required';
    }
    setErrors(currentErrors);
    return Object.keys(currentErrors).length === 0;
  };

  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(step + 1);
    }
  };

  const prevStep = () => setStep(step - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep2()) {
      console.log('Form data submitted:', formData);
      // Add form submission logic here
    }
  };

  const renderStep1 = () => (
    <div>
      <h2>Company & Social Media Details</h2>

      <div className="form-group">
        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          className={`form-input ${errors.companyName ? 'error-input' : ''}`}
          value={formData.companyName}
          onChange={handleInputChange}
        />
        {errors.companyName && <span className="error-message">{errors.companyName}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="instagramHandle"
          placeholder="Instagram Handle"
          className={`form-input ${errors.instagramHandle ? 'error-input' : ''}`}
          value={formData.instagramHandle}
          onChange={handleInputChange}
        />
        {errors.instagramHandle && <span className="error-message">{errors.instagramHandle}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="linkedinProfile"
          placeholder="LinkedIn Profile"
          className={`form-input ${errors.linkedinProfile ? 'error-input' : ''}`}
          value={formData.linkedinProfile}
          onChange={handleInputChange}
        />
        {errors.linkedinProfile && <span className="error-message">{errors.linkedinProfile}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="facebookPage"
          placeholder="Facebook Page"
          className={`form-input ${errors.facebookPage ? 'error-input' : ''}`}
          value={formData.facebookPage}
          onChange={handleInputChange}
        />
        {errors.facebookPage && <span className="error-message">{errors.facebookPage}</span>}
      </div>

      <div className="form-group">
        <input
          type="text"
          name="twitterHandle"
          placeholder="X (formerly Twitter) Handle"
          className={`form-input ${errors.twitterHandle ? 'error-input' : ''}`}
          value={formData.twitterHandle}
          onChange={handleInputChange}
        />
        {errors.twitterHandle && <span className="error-message">{errors.twitterHandle}</span>}
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <h2>Media Uploads & Additional Information</h2>

      <div className="upload-field">
        <span>{fileStatus.stockImages || 'Please upload your stock images here'}</span>
        <input
          type="file"
          name="stockImages"
          id="stockImages"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="stockImages" className="upload-button">
          Upload
        </label>
        {errors.stockImages && <span className="error-message">{errors.stockImages}</span>}
      </div>

      <div className="upload-field">
        <span>{fileStatus.videos || 'Please upload your videos here'}</span>
        <input
          type="file"
          name="videos"
          id="videos"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="videos" className="upload-button">
          Upload
        </label>
        {errors.videos && <span className="error-message">{errors.videos}</span>}
      </div>

      <div className="upload-field">
        <span>{fileStatus.logo || 'Please upload your logo here'}</span>
        <input
          type="file"
          name="logo"
          id="logo"
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
        <label htmlFor="logo" className="upload-button">
          Upload
        </label>
        {errors.logo && <span className="error-message">{errors.logo}</span>}
      </div>

      {/* Added margin-bottom to position the credentials field lower */}
      <div className="form-group" style={{ marginBottom: '30px' }}>
        <input
          type="text"
          name="socialMediaLogin"
          placeholder="Social Media Login (Optional)"
          className="form-input"
          value={formData.socialMediaLogin}
          onChange={handleInputChange}
        />
      </div>

      <div className="form-group">
        <textarea
          name="referenceLinks"
          placeholder="Reference Links"
          className="form-input"
          value={formData.referenceLinks}
          onChange={handleInputChange}
        />
      </div>
    </div>
  );

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      {step === 1 ? renderStep1() : renderStep2()}

      <div className="button-group">
        {step > 1 && <button type="button" className="form-button" onClick={prevStep}>Back</button>}
        {step === 1 && <button type="button" className="form-button-next" onClick={nextStep}>Next</button>}
        {step === 2 && <button type="submit" className="form-button">Submit</button>}
      </div>
    </form>
  );
};

export default SocialMediaForm;
