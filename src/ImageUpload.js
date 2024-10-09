import React, { useState } from 'react';
import axios from 'axios';
import './ImageUpload.css';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [showSocialDropdown, setShowSocialDropdown] = useState(false);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [message, setMessage] = useState('');

  // Xử lý khi người dùng chọn file
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  // Upload file và tải file .txt kết quả về
  const handleUpload = async () => {
    if (!selectedFile) {
      setMessage('Vui lòng chọn một file trước!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        responseType: 'blob',
      });

      const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.setAttribute('download', 'text.txt');
      document.body.appendChild(link);
      link.click();
      link.remove();

      setMessage('Upload thành công!');
    } catch (error) {
      console.error('Lỗi khi upload file:', error);
      setMessage('Đã xảy ra lỗi khi upload file.');
    }
  };

  // Gửi yêu cầu answer
  const handleAnswer = async () => {
    try {
      const response = await axios.post('http://localhost:5000/answer');
      setMessage('Đã gửi yêu cầu answer!');
    } catch (error) {
      console.error('Lỗi khi gửi answer:', error);
      setMessage('Đã xảy ra lỗi khi gửi yêu cầu answer.');
    }
  };

  // Xử lý hiển thị hoặc ẩn dropdown Social
  const toggleSocialDropdown = () => {
    setShowSocialDropdown(!showSocialDropdown);
  };

  // Xử lý hiển thị hoặc ẩn modal Donate
  const toggleDonateModal = () => {
    setShowDonateModal(!showDonateModal);
  };

  return (
    <div>
      <div className="upload-container">
        <h1>Image to Text for Question
        </h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <div className="button-container">
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleAnswer}>Answer</button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>

      {/* Nút Social */}
      <button className="social-button" onClick={toggleSocialDropdown}>
        ☰
      </button>

      {/* Dropdown các nút Social */}
      {showSocialDropdown && (
        <div className="social-dropdown">
          <button>
            <a href="https://www.facebook.com/hoangkha.nguyenhuynh.73/" target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </button>
          <button>
            <a href="https://github.com/ConThoBanSung" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </button>
        </div>
      )}

      {/* Nút Donate */}
      <button className="donate-button" onClick={toggleDonateModal}>
        Donate
      </button>

      {/* Modal thông tin Donate */}
      {showDonateModal && (
        <>
          <div className="overlay" onClick={toggleDonateModal}></div>
          <div className="modal">
            <h2>Ủng hộ chúng tôi</h2>
            <p>STK MoMo: 0769532711</p>
            <p>STK MB Bank: 0769532711</p>
            <button onClick={toggleDonateModal}>Đóng</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ImageUpload;
