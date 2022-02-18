import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/_models/role';
import { User } from 'src/app/_models/user';
import { UserService } from 'src/app/_services/user.service';

declare var $: any;

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit, OnDestroy {

  private subscriptions: Subscription[] = [];
  user: User = new User();
  currentId: number = 0;

  listRole: Role[] = [];

  roles = [
    {'id': 1, 'name': 'ROLE_ADMIN'},
    {'id': 2, 'name': 'ROLE_SMOD'},
    {'id': 3, 'name': 'ROLE_CONVERTER'},
    {'id': 4, 'name': 'ROLE_USER'}
  ];
  //role = this.roles[0];

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.showRole();
    this.getListRoles();
    this.route.paramMap.subscribe(() => {
      this.handleUserDetails();
    });
  }

  handleUserDetails(): void {
    this.currentId = +this.route.snapshot.params['id'];
    this.userService.getAdminUser(this.currentId).subscribe(data => {
      this.user = data;
    }
    );
    
  }

  submitEditAdminUser(editForm: NgForm): void {
    this.subscriptions.push(this.userService.updateAdminUser(this.user).subscribe(
        response => {
            console.log(response.roleList);
            this.router.navigateByUrl('/quan-tri/nguoi-dung').then(r => {});
            editForm.reset();
            this.toastr.success(`Tài khoản ${response.username} cập nhật thành công!`);
        }, error => this.toastr.error(error.error.message)
    ));
  }

  getListRoles(){
    this.subscriptions.push(this.userService.getListRoles().subscribe(
      response =>{
        this.listRole = response;     
      }
    ));
  }

  get isActiveBool() {
    return this.user.status == 1
  }
 
  set isActiveBool(newValue:boolean) {
    this.user.status = newValue ? 1 : 0
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  showRole(){
    $(document).ready(function () {
      $('.mdb-select').materialSelect();
  });
  }

}
