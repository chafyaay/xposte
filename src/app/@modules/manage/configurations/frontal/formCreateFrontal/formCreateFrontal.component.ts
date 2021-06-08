import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FrontalService } from '@core/services/frontal.service';
import { UtilisateurService } from '@core/services/utilisateur.service';
import { FrontalFilter } from '@shared';
import { Frontal } from '@shared/models/Frontal';
import { User } from '@shared/models/user';
import { customEmailValidator, customIPListValidator } from '@shared/utils';

@Component({
  selector: 'app-create-frontal',
  templateUrl: './formCreateFrontal.component.html',
  styleUrls: ['./formCreateFrontal.component.scss'],
})
export class FormCreateFrontalComponent implements OnInit {
  @Input()
  frontalToUpdate: Frontal;
  @Output()
  closeEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  valideCreateFrontal: EventEmitter<Frontal> = new EventEmitter<Frontal>();

  frontalFomGroup: FormGroup;
  listUsers: User[];
  frontalUnicity: string;
  frontalToCreate = new Frontal();
  readonly OK = 'ok';
  readonly ERROR = 'error';

  get controls() {
    return this.frontalFomGroup.controls;
  }

  constructor(
    private formBuilder: FormBuilder,
    private utilisateurService: UtilisateurService,
    private frontalService: FrontalService
  ) {}

  ngOnInit() {
    if (this.frontalToUpdate.identifiant) {
      this.frontalUnicity = this.OK;
    }
    this.utilisateurService.getListUsers().subscribe((result) => {
      this.listUsers =
        // TODO: remove static users when liste-users api returns result
        result.length > 0
          ? result
          : [
              {
                identifiant: 'identifiantUtilisateur1',
              },
              {
                identifiant: 'identifiantUtilisateur2',
              },
              {
                identifiant: 'identifiantUtilisateur3',
              },
              {
                identifiant: 'identifiantUtilisateur4',
              },
              {
                identifiant: 'identifiantUtilisateur5',
              },
              {
                identifiant: 'userId1',
              },
              {
                identifiant: 'userId2',
              },
              {
                identifiant: 'userId3',
              },
              {
                identifiant: 'userId4',
              },
              {
                identifiant: 'userId5',
              },
              {
                identifiant: 'idUtilisateur1',
              },
              {
                identifiant: 'idUtilisateur2',
              },
            ];
    });

    this.frontalFomGroup = this.formBuilder.group({
      nom: [this.frontalToUpdate.nom, [Validators.required]],
      seuil: [
        this.frontalToUpdate.seuil,
        [Validators.required, Validators.min(0), Validators.pattern('^\\d+$')],
      ],
      listeAdressesIPs: [
        this.frontalToUpdate.listeAdressesIPs
          ? this.frontalToUpdate.listeAdressesIPs.join(',')
          : '',
        [Validators.required, customIPListValidator()],
      ],
      adresseMailAlerte: [
        this.frontalToUpdate.adresseMailAlerte,
        [Validators.required, customEmailValidator()],
      ],
      users: [
        this.frontalToUpdate.listeIdentifiantsUtilisateurs,
        [Validators.required],
      ],
    });
  }

  checkFrontalUnicity(): void {
    if (!this.controls.nom.value) {
      this.frontalUnicity = undefined;
      return;
    }
    this.frontalUnicity = this.OK;
    // Uncomment check when API works
    /*
    const frontalFilter = new FrontalFilter();
    frontalFilter.nomFrontal = this.controls.nom.value;
    this.frontalService.searchFrontals(frontalFilter).subscribe((result) => {
      const frontals = result.body;
      // If search by name has result
      if (Array.isArray(frontals) && frontals.length > 0) {
        // If update, check if it's the same frontal
        if (this.frontalToUpdate.identifiant) {
          // If different from selected frontal
          if (frontals[0].identifiant !== this.frontalToUpdate.identifiant) {
            this.frontalUnicity = this.ERROR;
          } 
          else {
            this.frontalUnicity = this.OK;
          }
        }
        // If creation and list is not empty
        else{
          this.frontalUnicity = this.ERROR;
        }
      } else {
        this.frontalUnicity = this.OK;
      }
    });*/
  }

  createFrontal() {
    if (this.isValidForm()) {
      this.formToModel();
      this.valideCreateFrontal.emit(this.frontalToCreate);
    }
  }

  closeFormulaire() {
    this.closeEvent.emit(false);
  }

  isValidForm(): boolean {
    return this.frontalFomGroup.valid && this.frontalUnicity === this.OK;
  }

  private formToModel() {
    this.frontalToCreate.identifiant = null;
    this.frontalToCreate.nom = this.controls.nom.value;
    this.frontalToCreate.seuil = this.controls.seuil.value;
    this.frontalToCreate.listeAdressesIPs = this.controls.listeAdressesIPs.value.split(
      ','
    );
    this.frontalToCreate.adresseMailAlerte = this.controls.adresseMailAlerte.value;
    this.frontalToCreate.listeIdentifiantsUtilisateurs = this.controls.users.value;
  }
}
