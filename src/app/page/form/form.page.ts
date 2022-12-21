import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatabaseService } from 'src/app/servico/database.service';
import { UtilityService } from 'src/app/servico/utility.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.page.html',
  styleUrls: ['./form.page.scss'],
})
export class FormPage implements OnInit {
  idRota = null;
  receita: any = {}; 
  
  constructor(
    private rota: ActivatedRoute,
    private datab: DatabaseService,
    private router: Router,
    private util: UtilityService) { }

  ngOnInit() {
    this.idRota = this.rota.snapshot.params['id'];

    if (this.idRota) {
      this.datab.getReceitaUnica(this.idRota).subscribe(results => this.receita = results);
    } 
  }

  editarReceita(form: any) {
    try { 
      this.datab.updateReceita(form.value, this.idRota);
    } finally {
      this.util.toastMessage("Receita atualizada", "bottom", 2000, "secondary");
      this.router.navigate(['/home']);
    }
  }

}
