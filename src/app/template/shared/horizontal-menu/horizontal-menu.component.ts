import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { HROUTES } from './navigation-routes.config';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Globals } from 'app/_helpers/globals';


@Component({
  selector: 'app-horizontal-menu',
  templateUrl: './horizontal-menu.component.html',
  styleUrls: ['./horizontal-menu.component.scss']
})
export class HorizontalMenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() hRoutes;
  public menuItems: any[];
  public config: any = {};
  level: number = 0;
  transparentBGClass = "";
  menuPosition = 'Side';

  layoutSub: Subscription;

  constructor(private layoutService: LayoutService,
    private configService: ConfigService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    public authService: AuthService,
    public globals: Globals,) {
    this.config = this.configService.templateConf;
  }

  ngOnInit() {
    this.menuItems = this.hRoutes;
  }

  ngAfterViewInit() {

    this.layoutSub = this.configService.templateConf$.subscribe((templateConf) => {
      if (templateConf) {
        this.config = templateConf;
      }
      this.loadLayout();
      this.cdr.markForCheck();

    })
  }

  loadLayout() {

    if (this.config.layout.menuPosition && this.config.layout.menuPosition.toString().trim() != "") {
      this.menuPosition = this.config.layout.menuPosition;
    }


    if (this.config.layout.variant === "Transparent") {
      this.transparentBGClass = this.config.layout.sidebar.backgroundColor;
    }
    else {
      this.transparentBGClass = "";
    }

  }

  makeTabActive(index) {
    console.log('Menu item: ', this.menuItems[index]);

    for (let i = 0; i < this.menuItems.length; i++) {
      this.menuItems[i].class = this.menuItems[i].class.replace('m-active', '');
    }
    if(!this.menuItems[index].submenu.length) {
      this.menuItems[index].class += ' m-active';
    }
  }

  ngOnDestroy() {
    if (this.layoutSub) {
      this.layoutSub.unsubscribe();
    }
  }

}
