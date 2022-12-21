import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { DatabaseService } from 'src/app/servico/database.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  constructor(
    private alert: AlertController,
    private util: UtilityService,
    private banco: DatabaseService
    
  ) { }

  ngOnInit() {}

  async mensagemAlert() {
    const alerta = this.alert.create({
      mode: "ios",
      header: 'Cadastrar nova receita:',
      inputs: [
        {
          name: 'receita',
          type: 'text',
          placeholder: 'Nome da receita'
        },
        {
          name: 'ingrediente',
          type: 'text',
          placeholder: 'Ingredientes'   
        },
        {
          name: 'preparo',
          type: 'text',
          placeholder: 'Modo de Preparo'
        }
      ],

      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            this.util.toastMessage("Cancelado", "bottom", 2000, "danger");
          }
        },
        {
          text: 'Cadastrar',
          handler: (guardar) => {
            let receita = {receita: guardar.receita, ingrediente: guardar.ingrediente, modo: guardar.preparo, status: false};
          try {
            this.banco.postReceita(receita);
          } catch(err) {
            console.log(err);
          } finally {
            this.util.toastMessage("Receita cadastrada", "bottom", 2000, "success");
          }
          } 
        }
      ]
    });

      (await alerta).present();
  }

}
