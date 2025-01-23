import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetailsMacchineComponent } from 'src/app/components/details-macchine/details-macchine.component';
import { MenuComponent } from 'src/app/components/menu/menu.component';
import { MacchineService } from 'src/app/services/macchine.service';

@Component({
  selector: 'app-list-macchines-page',
  templateUrl: './list-macchines.component.html',
  styleUrls: ['./list-macchines.component.scss'],
  standalone: false
})
export class ListMacchinesComponent  implements OnInit {
  @ViewChild('menu', { static: false })
  menuComponent!: MenuComponent;


  status: any;
  statusId: number = 1;
  macchines: any[] = []
  loading: boolean = false;

  constructor(
    private macchineService: MacchineService,
    private modalController: ModalController
  ) { }

  async ngOnInit() {
    this.status = await this.macchineService.getMacchineStatus();
    this.statusId = this.status[0].id;
    await this.getMacchines();
    this.macchineService.onMacchineUpdate().subscribe(async (updatedMachine) => {
      await this.getMacchines();
    });
    this.macchineService.onMacchineCreated().subscribe(async (updatedMachine) => {
      await this.getMacchines();
    });
  }

  async getMacchines() {
    this.loading = true;
    this.macchines = await this.macchineService.getMacchinesByStatus(this.statusId);
    this.loading = false;
  }

  async onSelectStatus() {
    await this.getMacchines();
  }

  async addNewMacchine() {
    const modal = await this.modalController.create({
      component: DetailsMacchineComponent,
      componentProps: {
        create: true,
        statusId: this.statusId
      }
    })

    await modal.present();

    const {
      data: { refresh }
    } = await modal.onWillDismiss();

    if(refresh) {
      await this.getMacchines()
    }
  }

  async goToDetialsMacchine(macchine: any) {
    const modal = await this.modalController.create({
      component: DetailsMacchineComponent,
      componentProps: {
        create: false,
        macchine: macchine
      }
    })

    await modal.present();

    const {
      data: { refresh }
    } = await modal.onWillDismiss();

    if(refresh) {
      await new Promise((f) => setTimeout(f, 3000))
      await this.getMacchines()
    }
  }

  async openMenu() {
    await this.menuComponent.openMenu();
  }

  async closeMenu() {
    await this.menuComponent.closeMenu();
  }
}
