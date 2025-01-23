import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, ModalController, ToastController } from '@ionic/angular';
import { MacchineService } from 'src/app/services/macchine.service';

@Component({
  selector: 'app-details-macchine',
  templateUrl: './details-macchine.component.html',
  styleUrls: ['./details-macchine.component.scss'],
  standalone: false
})
export class DetailsMacchineComponent  implements OnInit {
  
  @Input() macchine: any;
  @Input() create: boolean = false;
  @Input() statusId: any;
  
  macchineForm: FormGroup = new FormGroup({});
  status: any[] = [];
  data: any;
  loading: boolean = true;
  history: string[] = []

  constructor(
    private modalController: ModalController,
    private macchineService: MacchineService,
    private alertController: AlertController,
    private toastController: ToastController
  ) { }

  async ngOnInit() {
    this.status = await this.macchineService.getMacchineStatus()
    this.formBuilderMacchine();

    if(this.macchine) {
      this.macchineForm.get('id')?.setValue(this.macchine.id);
      this.macchineForm.get('name')?.setValue(this.macchine.name);
      this.macchineForm.get('cep')?.setValue(this.macchine.cep);
      this.macchineForm.get('address')?.setValue(this.macchine.address);
      this.macchineForm.get('complement')?.setValue(this.macchine.complement);
      this.macchineForm.get('neighborhood')?.setValue(this.macchine.neighborhood);
      this.macchineForm.get('city')?.setValue(this.macchine.city);
      this.macchineForm.get('state')?.setValue(this.macchine.state);
      this.macchineForm.get('stausId')?.setValue(this.macchine.status.id);
      
      if(this.macchine.history.length > 0) {
        this.macchine.history.forEach((value: any) => {
          if(value.type == 'INSERT') {
            this.history.push(`Máquina criada por ${value.user}`);
          }
          if(value.type == 'DELETE') {
            this.history.push(`Máquina deletada por ${value.user}`);
          }
          if(value.type == 'UPDATE') {
            this.history.push(`Máquina atualizada por ${value.user}`);
          }
        })
      }
    }

    this.loading = false;
  }

  formBuilderMacchine() {
    this.macchineForm = new FormGroup({
      id: new FormControl(null, []),
      name: new FormControl(null, [Validators.required]),
      cep: new FormControl(null, [Validators.required]),
      address: new FormControl({ value: null, disabled: true}, []),
      complement: new FormControl(null, []),
      neighborhood: new FormControl({ value: null, disabled: true}, []),
      city: new FormControl({ value: null, disabled: true}, []),
      state: new FormControl({ value: null, disabled: true}, []),
      statusId: new FormControl({ value: this.statusId ? this.statusId : 1, disabled: false}, [Validators.required])
    })
  }

  async getAddressData() {
    this.data = await this.macchineService.getDataAddressByCEP(this.macchineForm.get('cep')?.value)
    if(this.data && this.data.logradouro && this.data.bairro && this.data.localidade && this.data.estado) {
      this.macchineForm.get('address')?.setValue(this.data.logradouro)
      this.macchineForm.get('neighborhood')?.setValue(this.data.bairro)
      this.macchineForm.get('city')?.setValue(this.data.localidade)
      this.macchineForm.get('state')?.setValue(this.data.estado)
    }
    else {
      this.macchineForm.get('address')?.setValue(null)
      this.macchineForm.get('neighborhood')?.setValue(null)
      this.macchineForm.get('city')?.setValue(null)
      this.macchineForm.get('state')?.setValue(null)
    }
  }

  async submit() {
    this.macchineForm.markAllAsTouched();

    if (this.macchineForm.invalid) {
      await this.createToast(`Preencha os campos para adicionar ou atualizar uma máquina`, 'warning');
      return
    }

    let macchine = this.macchineForm.getRawValue();

    if(this.create) {
      try {
        await this.macchineService.createMacchine(macchine)
        await this.createToast('Máquina criada com sucesso', 'success')
        await this.backButton()
      }
      catch {
        await this.createToast('Erro ao criar a máquina', 'danger')
        await this.backButton()
      }
    }
    else {
      try {
        await this.macchineService.updateMacchine(macchine)
        await this.createToast('Máquina atualizada com sucesso', 'success')
        await this.backButton()
      }
      catch {
        await this.createToast('Erro ao atualizar a máquina', 'danger')
        await this.backButton()
      }
    }
  }

  async deleteMacchine() {
    const alert = await this.alertController.create({
      mode: 'md',
      backdropDismiss : false,
      header: 'Confirmação',
      subHeader: 'Deseja deletar essa máquina?',
      cssClass: 'alert-confirm-delete-train',
      buttons: [
        {
          text: 'Não',
          role: 'cancel',
          handler: () => {}
        }, {
          text: 'Sim',
          handler: async () => {
            try {
              await this.macchineService.deleteMacchine(this.macchineForm.get('id')?.value)
              await this.createToast('Máquina excluída com sucesso', 'success')
              await this.backButton();
            } 
            catch{
              await this.createToast('Erro ao deletar a máquina', 'danger')
              await this.backButton()
            }
          }
        }
      ]
    });

    await alert.present();
  }

  
  async backButton() {
    await this.modalController.dismiss({
      refresh: true
    });
  }

  async createToast(message: string, color: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message: message,
      duration,
      color: color
    });
    toast.present();
  }

}
