import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: false
})
export class MenuComponent  implements OnInit {
  userData: any;

  constructor(
    private authService: AuthService,
    private menu: MenuController,
    private router: Router,
  ) { }

  async ngOnInit() {
    this.userData = await this.authService.getLocalUser();
  }

  redirect(url: string) {
    this.router.navigateByUrl(url)
    console.log(this.userData)
    this.closeMenu();
  }

  logout() {
    this.authService.logOut();
    this.router.navigateByUrl('login');
    this.closeMenu()
  }

  async openMenu() {
    await this.menu.open();
  }

  async closeMenu() {
    await this.menu.close();
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent) {
    const menu = document.querySelector('ion-menu');
    const menuContent = document.querySelector('ion-content');
    const logoutButton = document.querySelector('.menu-logout-footer');

    // Verifica se o clique foi fora do menu ou do botão "Sair"
    if (menu && !menu.contains(event.target as Node) && !menuContent?.contains(event.target as Node) && !logoutButton?.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

}
