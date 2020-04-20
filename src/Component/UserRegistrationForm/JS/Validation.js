import toastr from 'toastr'
import 'toastr/build/toastr.min.css'

export const UserBasicValidation = (e) => {
  const fields = e.values.userResponse
  const errors = []
  let count = 0

  if (!fields.FirstName) {
    errors.FirstName = 'FirstName cannot be Empty !!'
    count = count + 1
  } else {
    if (fields.FirstName.length <= 2) {
      errors.FirstName = 'FirstName length should be more than 2 !!'
      count = count + 1
    }
    if (!fields.FirstName.match(/^[a-zA-Z]+$/)) {
      errors.FirstName = 'FirstName cannot contains spaces or Numbers !!'
      count = count + 1
    }
  }

  if (!fields.LastName) {
    errors.LastName = 'LastName cannot be Empty !!'
    count = count + 1
  } else {
    if (fields.LastName.length <= 2) {
      errors.LastName = 'LastName length should be more than 2 !!'
      count = count + 1
    }
    if (!fields.LastName.match(/^[a-zA-Z]+$/)) {
      errors.LastName = 'LastName cannot contaims spaces or Numbers !!'
      count = count + 1
    }
  }

  if (fields.DateOfBirth === null) {
    errors.DateOfBirth = 'Please Enter the valid DOB !!'
    count = count + 1
  } else {
    const agedata = new Date().getFullYear() - fields.DateOfBirth.getFullYear()
    if (agedata <= 4) {
      errors.age = 'Please Enter the valid DOB !!'
      errors.DateOfBirth = 'Please Enter the valid DOB !!'
      count = count + 1
    }
  }

  if (fields.Nationality === 'default') {
    errors.Nationality = 'Please select Nationality !!'
    count = count + 1
  }

  if (!fields.Height) {
    errors.Height = 'Height cannot be Empty !!'
    count = count + 1
  }

  if (!fields.Weight) {
    errors.Weight = 'Weight cannot be Empty !!'
    count = count + 1
  }

  return { errors, count }
}

export const UserPersonalValidation = (e) => {
  const fields = e.values.userResponse
  const errors = []
  let count = 0

  if (fields.Position === 'defaultPlayer') {
    errors.Position = 'Please Select Player Position'
    count = count + 1
  }

  if (fields.Role === 'default0') {
    errors.Role = 'Please Select Player Role'
    count = count + 1
  }

  if (fields.Foot === 'default') {
    errors.Foot = 'Please select playing Foot'
    count = count + 1
  }
  return { errors, count }
}

export const UserClubValidation = (e) => {
  // let fields = e.values.userResponse;
  const errors = []
  let count = 0

  const Clubs = e.values.userResponse.Clubs

  if (Clubs.length >= 2) {
    if (
      Clubs[Clubs.length - 1].ClubName === '' ||
      Clubs[Clubs.length - 1].From === null ||
      Clubs[Clubs.length - 1].To === null
    ) {
      errors.prevClub = 'Previous Club cannot be Empty'
      toastr.error(errors.prevClub)
      count = count + 1
    } else if (
      new Date(Clubs[Clubs.length - 1].From) ===
        new Date(Clubs[Clubs.length - 1].To) ||
      new Date(Clubs[Clubs.length - 1].To) <=
        new Date(Clubs[Clubs.length - 1].From)
    ) {
      count = count + 1
      errors.Clubs = 'Date Invalid'
      toastr.error(errors.Clubs)
    }
  }

  return { errors, count }
}

export const AddClubValidation = (clubs) => {
  console.log(clubs)
  const Clubs = clubs.Clubs
  const errors = []
  let rowSucess = false

  if (Clubs.length >= 1) {
    if (
      Clubs[Clubs.length - 1].ClubName === '' ||
      Clubs[Clubs.length - 1].From === null ||
      Clubs[Clubs.length - 1].To === null
    ) {
      errors.Clubs =
        'To add Previous Information first you need to add Current Data. Which can not be empty!!'
      toastr.error(errors.Clubs)
    } else if (
      new Date(Clubs[Clubs.length - 1].From) ===
        new Date(Clubs[Clubs.length - 1].To) ||
      new Date(Clubs[Clubs.length - 1].To) <=
        new Date(Clubs[Clubs.length - 1].From)
    ) {
      errors.Clubs =
        'Previous Clubs Dates should not be more than or equal to current Date'
      toastr.warning(errors.Clubs)
    } else {
      errors.Clubs = 'Another Row Added'
      toastr.success(errors.Clubs)
      rowSucess = true
    }
  }

  return { errors, rowSucess }
}

export const UserContactValidation = (e) => {
  const fields = e.values.userResponse
  const errors = []
  let count = 0
  if (!fields.MobileNumber) {
    errors.MobileNumber = 'Invalid Number'
    count = count + 1
  } else {
    if (fields.MobileNumber.length <= 9) {
      errors.MobileNumber = 'Please Enter the correct Number'
      count = count + 1
    }
  }

  if (!fields.AlternateMobileNumber) {
    errors.AlternateMobileNumber = null
  } else {
    if (fields.AlternateMobileNumber.length <= 9) {
      errors.AlternateMobileNumber =
        'Please Enter the correct Number'
      count = count + 1
    }
  }

  if (fields.MobileNumber === fields.AlternateMobileNumber) {
    errors.AlternateMobileNumber = 'Cannot be Same as Mobile Number'
    count = count + 1
  }

  if (!fields.Email) {
    errors.Email = 'Email cannot be empty'
    count = count + 1
  }

  if (typeof fields.Email !== 'undefined') {
    const lastAtPos = fields.Email.lastIndexOf('@')
    const lastDotPos = fields.Email.lastIndexOf('.')

    if (
      !(
        lastAtPos < lastDotPos &&
        lastAtPos > 0 &&
        fields.Email.indexOf('@@') === -1 &&
        lastDotPos > 2 &&
        fields.Email.length - lastDotPos > 2
      )
    ) {
      errors.Email = 'Email is not valid'
      count = count + 1
    }
  }
  return { errors, count }
}
