import React, { PureComponent } from 'react'
import '../CSS/upload.scss'
import PropTypes from 'prop-types'

class CardProfile extends PureComponent {
  handleImageChange (e) {
    e.preventDefault()
    this.props.handleImageChange(e)
  }

  render () {
    const { Photo } = this.props.values.userResponse
    let $Photo = null
    if (Photo) {
      $Photo = <img src={Photo} alt="" />
    } else {
      $Photo = (
        <div className="previewText">
          <i className="fa fa-upload" aria-hidden="true"></i>
        </div>
      )
    }

    return (
      <div className="">
        <form className="previewComponent">
          <div className="avatar-upload">
            <div className="avatar-edit">
              <input
                className="fileInput"
                type="file"
                onChange={(e) => this.handleImageChange(e)}
                id="imageUpload"
                accept=".png, .jpg, .jpeg"
              />
            </div>
            <label htmlFor="imageUpload">
              <div className="avatar-preview">
                <div className="imgPreview" id="Photo">
                  {$Photo}
                </div>
              </div>
            </label>
          </div>
          <div>
            {Photo ? (
              <label className="imageUploadStatusSuccess">
                Image Uploaded Successfully.
              </label>
            ) : (
              <label className="imageUploadStatus">
                Please Choose Image to Upload
              </label>
            )}
          </div>
        </form>
      </div>
    )
  }
}

CardProfile.propTypes = {
  values: PropTypes.object,
  handleImageChange: PropTypes.func
}

export default CardProfile
