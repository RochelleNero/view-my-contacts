import { Component, OnInit, TemplateRef, ViewEncapsulation } from '@angular/core';
import * as $ from "jquery";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class ContactsComponent implements OnInit {
  modalRef?: BsModalRef;

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    lastName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    cellNumber: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required, Validators.maxLength(225)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    bio: new FormControl('', [Validators.required, Validators.maxLength(225)]),
  });

  get f() { return this.form.controls; }

  contactInitials: string[] = [];
  contactName='';
  contactCellNumber ='';
  contactAddress = '';
  contactEmail = '';
  contactAgify = '';
  contactBio = '';
  searchText = '';
  agify = 'https://api.agify.io/?name=';
  showContactDetailsSection = false;

  contacts = [
    {
        "firstName": "Bob",
        "lastName": "George",
        "email": "bob@email.com",
        "address": "24 Main Road",
        "cellNumber": "0123456789",
        "bio": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec tristique tincidunt venenatis. Phasellus tincidunt aliquam nibh mollis ullamcorper. Integer a ipsum at lacus mollis tincidunt a vel ipsum. Nullam sed metus porta, sagittis magna quis, imperdiet ipsum. Phasellus faucibus mi quis feugiat placerat. Ut placerat, ipsum ac accumsan vehicula, dui nibh finibus augue, eget cursus sapien ex sed leo. Nulla convallis orci non arcu mollis ultrices. Vestibulum tempor non sapien ac sodales. Sed ac mauris ac libero dictum finibus. Mauris rhoncus neque ut bibendum viverra. Mauris a fringilla mauris, ut bibendum tortor. Mauris euismod iaculis enim mattis rutrum. Vivamus suscipit massa placerat, hendrerit metus ut, consequat ex. Vestibulum vitae commodo nisi. Nullam pellentesque sollicitudin lacus ac rhoncus."
    },
    {
        "firstName": "Alice",
        "lastName": "Burger",
        "email": "alice@email.com",
        "address": "256 Time Ave",
        "cellNumber": "0987654321",
        "bio": "Donec posuere tempor euismod. Nulla rutrum velit eu leo ultrices, vitae eleifend nisi porta. Etiam finibus maximus nunc, consectetur efficitur tortor eleifend quis. Integer tincidunt elit at erat viverra aliquam. Quisque a nisi metus. Donec scelerisque ligula ante, non aliquet ligula accumsan nec. Proin laoreet ante id massa eleifend dapibus. Duis tempus metus elit, sit amet maximus tortor dictum quis. Morbi sit amet gravida neque, sit amet luctus eros. Integer ultrices ut velit non gravida. Etiam laoreet libero et est rhoncus, a ultricies leo euismod."
    },
    {
        "firstName": "Trudy",
        "lastName": "Turner",
        "email": "trudy@email.com",
        "address": "16 Park Lane",
        "cellNumber": "0654987321",
        "bio": "Aenean nec augue neque. Vivamus neque enim, pretium at mollis feugiat, luctus id purus. Phasellus sagittis commodo diam, ut eleifend tellus pulvinar id. Quisque id mi porttitor, dapibus justo sed, consectetur libero. Nunc feugiat massa non urna mollis luctus. Morbi tincidunt quam nec quam malesuada vulputate. Quisque aliquet lacus nisi, ac rhoncus ipsum pellentesque nec."
    },
    {
        "firstName": "Pieter",
        "lastName": "Scott",
        "email": "pieter@email.com",
        "address": "512 Town Way",
        "cellNumber": "0129874563",
        "bio": "Suspendisse potenti. Nulla facilisi. Cras eu tempor magna. Nunc egestas, magna sed commodo interdum, elit lacus ullamcorper massa, vitae aliquet lectus diam vitae lorem. Maecenas eu accumsan odio, et lacinia orci. Pellentesque tempor diam justo, eu dictum leo mollis id. Proin iaculis neque et libero tristique, sit amet ultricies mauris maximus. Nam id velit hendrerit, ornare mi at, imperdiet ligula. Donec iaculis, elit a consectetur sollicitudin, magna urna interdum dui, id tincidunt nisl lorem id orci."
    }
];

  constructor(private modalService: BsModalService, private bsModalRef: BsModalRef) {}

  ngOnInit(): void {
    this.getInitials(); 
  }

  getInitials(){
    this.contacts.forEach((element) => {
      var name = `${element.firstName + ' ' +element.lastName}`;
          var names = name.split(' '),
          initials = names[0].substring(0, 1).toUpperCase();
      
      if (names.length > 1) {
          initials += names[names.length - 1].substring(0, 1).toUpperCase();
      }
      Object.assign(element, {initial: initials});
    });
  }

  showContactsDetails(contact: any){
    $('.contact-list-container').on('click', function(){
      $('.contact-list-container').removeClass('selected');
      $(this).addClass('selected');
    });

    var getAge = `${this.agify + contact.firstName}`;
    fetch(getAge)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      this.contactAgify = result.age;
    });

    this.showContactDetailsSection =true;
    this.contactName = `${contact.firstName + ' ' + contact.lastName}`;
    this.contactCellNumber = contact.cellNumber;
    this.contactAddress = contact.address;
    this.contactEmail = contact.email;
    this.contactBio = contact.bio;

  }

  isNumber(evt:any) {
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    return true;
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  save(): void{
    if(this.form.valid){
      this.contacts = [...this.contacts,
        {
          firstName : this.f.firstName.value,
          lastName : this.f.lastName.value,
          cellNumber:  this.f.cellNumber.value,
          address:  this.f.address.value,
          email: this.f.email.value,
          bio: this.f.bio.value,
        }];
        this.getInitials();
        this.form.reset();
        this.modalRef?.hide();
      
    } else {
      Swal.fire('Please complete all fields')
    }
  }

}


