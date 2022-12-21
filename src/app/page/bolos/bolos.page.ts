import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController } from '@ionic/angular';
import { Receitas } from '../../model/receitas.model';
import { DatabaseService } from '../../servico/database.service';
import { UtilityService } from '../../servico/utility.service';

@Component({
  selector: 'app-bolos',
  templateUrl: './bolos.page.html',
  styleUrls: ['./bolos.page.scss'],
})
export class BolosPage implements OnInit {
  receitas: Receitas[] = [];

  constructor(private datab: DatabaseService,
    private alert: AlertController,
    private util: UtilityService,
    private action: ActionSheetController) {}
  
  ngOnInit(): void {
    this.util.mensagemCarregando("Aguarde...", 1500);
    this.datab.getReceita().subscribe(results => this.receitas = results);
  }

  async mensagemAlert() {
    const alerta = this.alert.create({
      mode: "ios",
      header: 'Cadastrar nova receita:',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Nome da receita'
        },
        {
          name: 'ingredientes',
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
            let receita = {receita: guardar.nome, ingrediente: guardar.ingredientes, modo: guardar.preparo, status: false};
          try {
            this.datab.postReceita(receita);
          } catch(err) {
            console.log(err)
          } finally {
            this.util.toastMessage("Receita cadastrada", "bottom", 2000, "success");
          }
          } 
        }
      ]
    });

      (await alerta).present();
  }

  async actionFolha(receita: Receitas) {
    const sheet = this.action.create({
      mode: "ios",
      header: "Opções",
      buttons: [
        {
          text: receita.status ? 'Já preparei' : 'Não preparei ainda',
          icon: receita.status ? 'radio-button-off' : 'checkmark-circle',
          handler: () => {
            receita.status = !receita.status;
            this.datab.updateStatus(receita);
            receita.status ? this.util.toastMessage("Receita feita", "bottom", 2000, "secondary") : this.util.toastMessage("Receita desmarcada", "bottom", 2000, "primary");
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {}
        }
      ]
    });

      (await sheet).present();
  }

  deletarReceita(id: number){
    try {
      this.datab.deletaReceita(id);
    } catch(err) {
      console.log(err);
    } finally {
      this.util.toastMessage("Receita excluída", "bottom", 2000, "danger");
    }
  }
}
