import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { UserService } from 'app/admin/user/user.service';
import { TranslatedToastrService } from 'app/services/translated-toastr.service';
import { AuthService } from 'app/template/shared/auth/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ChangeUserPhotoComponent } from './change-user-photo/change-user-photo.component';
// import { ChangeUserPhotoComponent } from './change-user-photo/change-user-photo.component';

@Component({
  selector: 'app-edit-profile_menu_bar',
  templateUrl: './edit_profile_menu_bar.component.html',
  styleUrls: ['./edit_profile_menu_bar.component.scss']
})
export class EditProfileMenuBarComponent implements OnInit {
  isLoading;
	url;
	urlPreviousValue;
	userProfileImage;
	profileData;
	userImageChanged;
	updateProfile = false;
	updateProfileText = 'Update Profile';
	initialFormValue;
	passwordModalType;
	passwordMatch = true;
	userForm: FormGroup;
	changePasswordForm: FormGroup;
	isPasswordCorrect = true;
	isOdkPasswordCorrect = true;
	passwordModal;
	userAvatarUrl;

	constructor(
		private authService: AuthService,
		private fb: FormBuilder,
		private cdref: ChangeDetectorRef,
		private userService: UserService,
		private translate: TranslateService,
		private modalService: NgbModal,
		private translatedToastr: TranslatedToastrService,
		private spinner: NgxSpinnerService,
		private router: Router
	) {
		
	}

	ngOnInit() {
		const profileObs = this.authService.getProfile();
		this.isLoading = true;
		profileObs.subscribe(data => {
			this.isLoading = false;
			this.profileData = data;
			console.log("data",this.profileData)
			this.url = 'user/profile-picture';
			this.urlPreviousValue = this.url;
			this.userAvatarUrl = this.profileData.avatar;
			this.initializeForm();
			this.cdref.detectChanges();
		});
		this.initializePasswordForm();
	}

	getUserProfilePicture() {

	}

	initializeForm() {
		this.userForm = this.fb.group({
			id: [{ value: this.profileData.id, disabled: true }],
			name: [{ value: this.profileData.name, disabled: true }],
			username: [{ value: this.profileData.username, disabled: true }, [Validators.required]],
			email: [{ value: this.profileData.email, disabled: true }, [Validators.required, Validators.email]],
			phone_no: [{ value: this.profileData.phoneNo, disabled: true }, [Validators.required]],
			address: [{ value: this.profileData.address, disabled: true }]
		});
	}

	editProfile() {
		// const dialogRef = this.dialog.open(ProfileEditDialogComponent, {
		// 	data: this.profileData
		// });

		// dialogRef.afterClosed().subscribe(result => {
		// 	if (result === 1) {
		// 		// this.reloadData();
		// 	}
		// });
	}

	openDialog() {
		// const dialogRef = this.dialog.open(ProfileDeleteDialogComponent, {
		// 	data: this.profileData 
		// });

		// dialogRef.afterClosed().subscribe(result => {
		// 	if (result === 1) {
		// 		// this.reloadData();
		// 	}
		// });
	}

	uploadPic() {
		// const dialogRef = this.dialog.open(ProfileUploadImageDialogComponent, {
		// 	data: this.profileData 
		// });

		// dialogRef.afterClosed().subscribe(result => {
		// 	if (result === 1) {
		// 		// this.reloadData();
		// 	}
		// });
	}

	onSelectFile(event) {
		if (event.target.files && event.target.files[0]) {
			const reader = new FileReader();
			this.userProfileImage = event.target.files[0];
			console.log('FileName: ', event.target.files[0]);
			reader.readAsDataURL(event.target.files[0]); // read file as data url

			reader.onload = (e) => { // called once readAsDataURL is completed
				this.url = e.target['result'];
				this.userImageChanged = true;
			}
		}
	}

	updateInfo() {
		if (!this.updateProfile) {
			this.initialFormValue = this.userForm.value;
			this.updateProfileText = 'Save changes';
			this.updateProfile = !this.updateProfile;
			this.userForm.enable();
			this.userForm.get('id').disable();
		}
	}

	cancelUpdate() {
		if (this.updateProfile) {
			if (this.userForm.dirty || this.userImageChanged) {
				const conf = confirm('Are you sure you want to disgard the changed?');
				if (conf) {
					this.updateProfileText = 'Update Profile';
					this.updateProfile = !this.updateProfile;
					this.userForm.setValue(this.initialFormValue);
					this.userForm.disable();
					this.url = this.urlPreviousValue;
				}
			} else {
				this.updateProfileText = 'Update Profile';
				this.updateProfile = !this.updateProfile;
				this.userForm.setValue(this.initialFormValue);
				this.userForm.disable();
			}

		}
	}

	saveInfo() {
		if (this.userForm.dirty || this.userImageChanged) {

			if (this.userForm.dirty) {
				const conf = confirm('Save changes ?');
				if (conf) {
					this.updateProfile = false;
					const userId = this.userForm.get('id').value;

					this.userService.updateUser(userId, this.userForm.value).subscribe(res => {
						this.userForm.disable();
						const msg = 'Information updated successfully';
						// this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
					})

				}
			} if (this.userImageChanged) {
				const fmdata = new FormData();
				// fmdata.append('model', JSON.stringify(this.userForm.value));
				fmdata.append('avatar', this.userProfileImage);
				this.updateProfile = false;

				this.authService.updateAvatar(fmdata).subscribe(res => {
					this.userImageChanged = false;
					this.userForm.disable();
					const msg = 'Profile updated successfully';
					// this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');

				})
			}
		} else {
			alert('Nothing is changed');
			this.updateProfile = false;
			this.userForm.disable();
		}
	}

//-------------------------- change ASIMS password-----------------
	// changePassword() {
	// 	console.log('submitted: ', this.changePasswordForm.value);
	// 	this.userService.updateUserPassword(this.changePasswordForm.value).subscribe(res => {
	// 		if(res){
	// 			const msg = 'Password changed successfully.';
	// 			 this.showNotification('top', 'center', msg, 'success', 'pe-7s-check');
	// 			 this.isPasswordCorrect = true;
	// 			 $('#passwordModal').modal('hide');
	// 			 this.changePasswordForm.reset();
	// 		}else{
	// 			this.changePasswordForm.reset();
	// 			this.isPasswordCorrect = false;
	// 		}
	// 		console.log(res);
	// 	},err =>{
	// 		const msg = 'Failed to change password';
	// 			this.showNotification('top', 'center', msg, 'danger', 'pe-7s-attention');
	// 	});	
	//  }



	imageError(el) {
		el.onerror = '';
		el.src = '../../assets/img/user.png';
		console.log("error");
		return true;
	}

	// checkPasswords(group: FormGroup) { // here we have the 'passwords' group

	// 	const pass = group.controls.newPassword.value;
	// 	const confirmPass = group.controls.reTypePassword.value;

	// 	return pass === confirmPass ? null : { notSame: true }
	// }

	
	showPassWordModal(content) {
		this.passwordModal = this.modalService.open(content);
	}


	initializePasswordForm() {
		this.changePasswordForm = this.fb.group({
			current_password: [null, Validators.required],
			new_password: [null, Validators.compose([
				// 1. Password Field is Required
				Validators.required,
				Validators.minLength(8),
				// 2. check whether the entered password has capital case Letter A-Z
				this.patternValidator(/^(?=.*?[A-Z])/, { hasCapitalCase: true }),
				// 3. check whether the entered password has lower case letter a-z
				this.patternValidator(/(?=.*?[0-9])/, { hasANumber: true}),
				// 4. check whether password has a special character in it
				this.patternValidator(/(?=.*?[#?!@$%^&*-])/, { hasSpecialCharacter: true })
		  ])],
		  confirm_password: [null, Validators.required],
		}, { validator: this.checkPasswords });
	}

	  // compare new password with confirm password.
	  checkPasswords(form: AbstractControl): { invalid: boolean } {
		if (form.get("new_password").value !== form.get("confirm_password").value) {
		  return { invalid: true };
		}
	  }
	

	patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
		return (control: AbstractControl): { [key: string]: any } => {
		  if (!control.value) {
			// if control is empty return no error
			return null;
		  }
		  
		  // test the value of the control against the regexp supplied
		  const valid = regex.test(control.value);
		  
		  // if true, return no error (no error), else return error passed in the second parameter
		  return valid ? null : error;
		};
	}

	checkPasswordForm(passwordField: AbstractControl) {
		const { errors } = passwordField;
		if (errors != null) {
			if (Object.keys(errors).length !== 0) {
			  for (const property in errors) {
				console.log(`obj.${property} = ${errors[property]}`);
				switch(property) {
				  case "hasSpecialCharacter":
					this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_SPECIAL_CHARACTER_(#?!@$%^&*-)");
					break;
				  case "hasANumber":
					this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_NUMBER_(0-9)");
					break;
				  case "hasCapitalCase":
					this.translatedToastr.error("ERROR", "PASSWORD_MUST_HAVE_A_CAPITAL_LETTER_(A-Z)");
					break;
				  default:
				} 
			  }
			}
		}
	}


	getTranslation() {
		if (this.passwordModalType === 'user') {
			return this.translate.instant('USER_PASSWORD');
		} else {
			return this.translate.instant('ODK_PASSWORD');
		}
	}

	onResetPasswordSubmit() {
		this.checkPasswordForm(this.changePasswordForm.controls.new_password);
		if (this.changePasswordForm.valid) {
			const { current_password, new_password } = this.changePasswordForm.value;
		  	delete this.changePasswordForm.value.password_confirm;
			this.userService.updateUserPassword({oldPassword: current_password, newPassword: new_password}).subscribe(
				(data: any) => {
				if (data === true) {
					this.translatedToastr.success("SUCCESS", "PASSWORD_UPDATED_SUCCESSFULLY");
					this.passwordModal.close();
				} else {
					this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_CREATING_RECORD");
					console.log(data);
				}
				this.spinner.hide();
				},
				(error) => {
					this.spinner.hide();
					this.translatedToastr.error("ERROR", "THERE_WAS_AN_ERROR_UPDATING_RECORD");
					console.log(error);
				});
			}
			if (this.changePasswordForm.invalid) {
			// To display errors below forms
			Object.keys(this.changePasswordForm.controls).forEach(field => {
				const control = this.changePasswordForm.get(field); // {2}
				control.markAsTouched({ onlySelf: true }); // {3}
			});
			}
	}
	
	closeModal() {
		this.passwordModal.close();
		this.initializePasswordForm();
	}

	openChangeUserPhotoModal() {
		const modalRef = this.modalService.open(ChangeUserPhotoComponent);
		modalRef.componentInstance.data = this.profileData.id;
		modalRef.componentInstance.changePhotoSuccessfullEventEmitter.subscribe(() => {
			this.reloadPage();
		});
	}

	reloadPage() {
		// save current route first
		const currentRoute = this.router.url;
		this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
		  this.router.navigate([currentRoute]); // navigate to same route
		});
	  }
}
