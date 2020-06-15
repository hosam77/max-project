import {Component, EventEmitter, OnDestroy, OnInit, Output} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
 // @Output() featureSelected = new EventEmitter<string>();
 //  onSelect(feature: string){
 //    this.featureSelected.emit(feature);
 //  }
  constructor(private  dataStorgService: DataStorageService, private authService: AuthService) { }

  private userSub: Subscription;
  isAuthenticated = false;
  ngOnInit() {
    this.userSub = this.authService.user.subscribe(
      user => {
        this.isAuthenticated = !!user ;
        console.log(!user);
        console.log(!!user);
      }
    );
  }
  onSaveData(){
    this.dataStorgService.storeRecipes();
  }
  onFetchData(){
    this.dataStorgService.fetchRecipes().subscribe();
  }

  ngOnDestroy(): void {
  this.userSub.unsubscribe();
  }
  onLogout(){
    this.authService.logout();
  }

}
