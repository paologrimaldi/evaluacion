import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faDisease } from "@fortawesome/free-solid-svg-icons";
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';

import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from './services/api.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-root',
  standalone: true,
  providers: [ApiService],
  imports: [CommonModule, RouterOutlet, FontAwesomeModule, MatAutocompleteModule,FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  faDisease = faDisease;
  myControl = new FormControl('');
  puntospositivos = new FormControl('');
    puntosdemejora = new FormControl('');
  title = 'evaluacion';
  hasStarted = false;
  questions = [{text: 'Está abierto a la crítica constructiva', answer: 0, employee: '',valor:'Aprendizaje continuo',departamento:''},
   {text: 'Aprende de sus errores y busca la lección en cada problema', answer: 0, employee: '',valor:'Aprendizaje continuo',departamento:''}, 
   {text: 'Trasmite sus conocimientos para que otros aprendan', answer: 0, employee: '',valor:'Aprendizaje continuo',departamento:''}, 
   {text: 'Busca crecimiento personal y profesional', answer: 0, employee: '',valor:'Aprendizaje continuo',departamento:''},
    {text: 'Muestra capacidad y deseo de afrontar retos nuevos', answer: 0, employee: '',valor:'Aprendizaje continuo',departamento:''},
    {text: 'Puntos positivos', answer: '', employee: '',valor:'Aprendizaje continuo',departamento:''},
    {text: 'Puntos de mejora', answer: '', employee: '',valor:'Aprendizaje continuo',departamento:''},

    {text: 'Brinda un servicio al cliente interno y externo de excelencia', answer: 0, employee: '',valor:'Disponibilidad',departamento:''},
    {text: 'Esta dispuesto apoyar a otras áreas, aunque no sea su responsabilidad directa', answer: 0, employee: '',valor:'Disponibilidad',departamento:''}, 
    {text: 'Siempre está pendiente de sus herramientas de comunicación', answer: 0, employee: '',valor:'Disponibilidad',departamento:''}, 
    {text: 'Esta dispuesto en dar tiempo extra para finalizar el trabajo', answer: 0, employee: '',valor:'Disponibilidad',departamento:''},
  {text: 'Planifica ejecución y da seguimiento de forma óptima', answer: 0, employee: '',valor:'Disponibilidad',departamento:''},
  {text: 'Puntos positivos', answer: '', employee: '',valor:'Disponibilidad',departamento:''},
    {text: 'Puntos de mejora', answer: '', employee: '',valor:'Disponibilidad',departamento:''},


  {text: 'Busca soluciones a la medida del cliente interno y externo', answer: 0, employee: '',valor:'Innovación',departamento:''},
  {text: 'Busca maneras y soluciones para hacer los procesos más eficientes y efectivos', answer: 0, employee: '',valor:'Innovación',departamento:''},
  {text: 'Es persistente y está abierto a los cambios que puedan surgir en el proceso', answer: 0, employee: '',valor:'Innovación',departamento:''},
  {text: 'No tiene miedo a aprender y utiliza las herramientas de trabajo que están a la vanguardia', answer: 0, employee: '',valor:'Innovación',departamento:''},
  {text: 'Busca crear relaciones de confianza, compromiso y cercanas, generando alianzas personalizadas', answer: 0, employee: '',valor:'Innovación',departamento:''},
  {text: 'Puntos positivos', answer: '', employee: '',valor:'Innovación',departamento:''},
    {text: 'Puntos de mejora', answer: '', employee: '',valor:'Innovación',departamento:''},

  {text: 'Mantiene un comunicación constante y efectiva con todo el equipo', answer: 0, employee: '',valor:'Trabajo en equipo',departamento:''},
  {text: 'Trasmite la información de manera clara, especifica y concisa', answer: 0, employee: '',valor:'Trabajo en equipo',departamento:''},
  {text: 'Tiene claro y respetas las jerarquías', answer: 0, employee: '',valor:'Trabajo en equipo',departamento:''},
  {text: 'Esta dispuesto a escuchar para entender y mejorar', answer: 0, employee: '',valor:'Trabajo en equipo',departamento:''},
  {text: 'Comparte sus ideas y su opinión de manera constructiva', answer: 0, employee: '',valor:'Trabajo en equipo',departamento:''},
  {text: 'Puntos positivos', answer: '', employee: '',valor:'Trabajo en equipo',departamento:''},
  {text: 'Puntos de mejora', answer: '', employee: '',valor:'Trabajo en equipo',departamento:''},

];
  options = ['One', 'Two', 'Three'];
  valorNo = 0;
  questionNo = 0;
departamentoSelected: string = '';
filteredEmployees: Array<any> = [];
    summary: any = {};
    public chart: any;
constructor(private api: ApiService,private _snackBar: MatSnackBar,private router: ActivatedRoute)
{
}

ngOnInit(): void {
    this.router.queryParams.subscribe(params => {
        console.log(params);
        let hash = params['h'];

        this.departamentoSelected = this.findDepto(hash);
        console.log(this.departamentoSelected);
        this.filteredEmployees = this.employees.filter((employee) => {
            return employee.Departamento == this.departamentoSelected;});
      });
}
  public start()
  {
    this.hasStarted = true;
    this.valorNo = this.valorNo + 1;
  }

  createChart() {
    // Assuming 'result' is the object with the calculated averages

    // Extract labels and data from the 'result' object
    const labels = Object.keys(this.summary);
    const dataValues = Object.values(this.summary);

  
   
    // Update the datasets property in the Chart.js configuration
    this.chart = new Chart("MyChart", {
        type: 'radar',

        data: {
            labels: labels,
            datasets: [{
                label: this.myControl.value ? this.myControl.value : '',
                data: dataValues, // Each data value is in an array
                backgroundColor: 'rgba(239, 74, 49, 0.2)', // Set your desired background color
                borderColor: '#EF4A31', // Set your desired border color
                borderWidth: 2 // Set your desired border width
             }]
        },
        options: { responsive: true, scales: {
        r: {
            angleLines: {
                display: false
            },
            
            suggestedMin: 0,
            suggestedMax: 10
        }
    } },
        
    });
}

  setAnswer(index: number, answer: any)
  {
    if(answer == 99)
    {
        this.questions[index].answer = this.puntosdemejora.value == null ? '' : this.puntosdemejora.value;
        this.puntosdemejora.reset();
    }
    else if (answer == 98)
    {
        this.questions[index].answer = this.puntospositivos.value == null ? '' : this.puntospositivos.value;
        this.puntospositivos.reset();
    }
    else
    {
        this.questions[index].answer = answer; 
    }

    this.questions[index].employee = this.myControl.value ? this.myControl.value : '';
    this.questions[index].departamento = this.departamentoSelected;
    this.questionNo = this.questionNo + 1;

    if(this.questionNo == 7)
    {
      this.valorNo = this.valorNo + 1;
    }
    else if(this.questionNo == 14)
    {
      this.valorNo = this.valorNo + 1;
    }
    else if(this.questionNo == 21)
    {
      this.valorNo = this.valorNo + 1;
    }
    else if (this.questionNo == 28)
    {
            // Create a function to calculate the average of numeric values in an array
            const calculateAverage = (arr: Array<any>) => {
                const numericValues = arr.filter(value => typeof value === 'number');
                if (numericValues.length === 0) return 0; // Avoid division by zero
                const sum = numericValues.reduce((acc, value) => acc + value, 0);
                return sum / numericValues.length;
            };

        // Use reduce to calculate the average for each "valor" group
        const averageByValor = this.questions.reduce((acc: any, item) => {
            const { valor, answer } = item;
            if (!acc[valor]) {
                acc[valor] = [];
            }
            if (typeof answer === 'number') {
                acc[valor].push(answer);
            }
            return acc;
        }, {});

        // Calculate the final average for each "valor" group
        this.summary = Object.entries(averageByValor).reduce((acc: any, [valor, answers]: any) => {
            acc[valor] = calculateAverage(answers);
            return acc;
        }, {});

        this.createChart();

    }

  }


  
  public save()
  {
    this.api.addObject(this.questions, '', true).subscribe(
      (response) => {
        this._snackBar.open('Datos grabados exitosamente', 'Entendido');
        this.valorNo = 0;
        this.questionNo = 0;
        this.hasStarted = false;
        let index = this.filteredEmployees.findIndex((employee) => employee.NOMBRE === this.myControl.value);
        this.filteredEmployees.splice(index, 1);
        this.myControl.reset();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  public employees = [
    {
        "NO.": "1",
        "NOMBRE": "Aroche Diaz Karen Mariela",
        "Departamento": "Comercial"
    },
    {
        "NO.": "2",
        "NOMBRE": "Godínez Orozco Sindy Evelin",
        "Departamento": "Comercial"
    },
    {
        "NO.": "3",
        "NOMBRE": "Martínez Puac Daniel Esteban",
        "Departamento": "Comercial"
    },
    {
        "NO.": "4",
        "NOMBRE": "Patzan Rosales Erick Jonathan",
        "Departamento": "Comercial"
    },
    {
        "NO.": "5",
        "NOMBRE": "Locon Cirin Ervin Manfredy Arturo",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "6",
        "NOMBRE": "Garcia Morales Andrea Patricia",
        "Departamento": "Recursos Humanos"
    },
    {
        "NO.": "7",
        "NOMBRE": "Martínez Fernández Jenifer Estefany",
        "Departamento": "Recursos Humanos"
    },
    {
        "NO.": "8",
        "NOMBRE": "Rosa García Emma Janneth",
        "Departamento": "Recursos Humanos"
    },
    {
        "NO.": "9",
        "NOMBRE": "Argueta Canales Jeremy Alexander",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "10",
        "NOMBRE": "Aviles Jiménez Hugo Hernán",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "11",
        "NOMBRE": "Ba Maynor Vicente",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "12",
        "NOMBRE": "Gamboa Sandoval Idalia Eréndida",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "13",
        "NOMBRE": "González Pacay Dulby Daniel",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "14",
        "NOMBRE": "Lemus Monzón Selvin Miguel",
        "Departamento": "Auditoria"
    },
    {
        "NO.": "15",
        "NOMBRE": "Mayorga Castillo Jacqueline Andrea",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "16",
        "NOMBRE": "Morales Paredes Melvyn Donaldo",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "17",
        "NOMBRE": "Robles Hernandez Nydia Johanna",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "18",
        "NOMBRE": "García Hernández Marco Tulio",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "19",
        "NOMBRE": "Juaréz Bonilla Georgina Irasema",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "20",
        "NOMBRE": "Ramirez Gonzalez Julio Rodolfo",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "21",
        "NOMBRE": "Cac Seb Orlando",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "22",
        "NOMBRE": "Chub Tiul Felipe",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "23",
        "NOMBRE": "Gomez Ochoa Hambler Alexis",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "24",
        "NOMBRE": "Lem Lem Alvaro",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "25",
        "NOMBRE": "Mata Santos Oscar Eliú",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "26",
        "NOMBRE": "Menéndez Guillen Carlos Humberto",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "27",
        "NOMBRE": "Morales Zepeda Edras Nehemias",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "28",
        "NOMBRE": "Rodriguez Paz Douglas Esteven",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "29",
        "NOMBRE": "Salvador Solis Byron Eduardo",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "30",
        "NOMBRE": "Tzoc Calel Gerardo Francisco",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "31",
        "NOMBRE": "Lopez Velasquez Pedro",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "32",
        "NOMBRE": "Meneses Sierra Hannia",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "33",
        "NOMBRE": "Perez Morales Miguel Eduardo",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "34",
        "NOMBRE": "Velásquez Chacón Diego David",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "35",
        "NOMBRE": "Caal Chub Cesar Manuel",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "36",
        "NOMBRE": "Cal Cojoc Marcelino Elias",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "37",
        "NOMBRE": "Cucul Ic Teodoro",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "38",
        "NOMBRE": "Hernández Gómez José Armando",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "39",
        "NOMBRE": "Herrera Francisco",
        "Departamento": "Recursos Humanos"
    },
    {
        "NO.": "40",
        "NOMBRE": "Selvi Gómez Francisco Estuardo",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "41",
        "NOMBRE": "Chávez Hernández Kevin Ronaldo",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "42",
        "NOMBRE": "González Darwin Alexander",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "43",
        "NOMBRE": "Perez Ac Yoon Anderson",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "44",
        "NOMBRE": "Rocché Tzunú Juan Ricardo",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "45",
        "NOMBRE": "García Corzantes Nelson José Guillermo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "46",
        "NOMBRE": "Barahona Díaz Jorge Estuardo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "47",
        "NOMBRE": "Boch Cojón José Ricardo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "48",
        "NOMBRE": "Boror Canel Nelson Alexander",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "49",
        "NOMBRE": "Canel Boror Leandro Eliseo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "50",
        "NOMBRE": "Cermeño Sierra Victor Rolando",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "51",
        "NOMBRE": "Chocojay Mach Jairo Gilberto",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "52",
        "NOMBRE": "Cos Pirir Jose Luis",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "53",
        "NOMBRE": "Equite Subuyuj Jaime",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "54",
        "NOMBRE": "Guamuch Canón Milton Omar",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "55",
        "NOMBRE": "Pajoc Pirir Juan Martin",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "56",
        "NOMBRE": "Patzán Pirir Gustavo Adolfo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "57",
        "NOMBRE": "Pirir Canel Edwin Geovany",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "58",
        "NOMBRE": "Robles Reyes Edwin Eduardo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "59",
        "NOMBRE": "Sazo Perez Henry Fernando",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "60",
        "NOMBRE": "Siquiej García Salvador",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "61",
        "NOMBRE": "Tubac Car Sérgio Antonio",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "62",
        "NOMBRE": "Uleu Chitay Elmer Antonio",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "63",
        "NOMBRE": "Velasquez Saban Luis Alfredo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "64",
        "NOMBRE": "Xinic Vicente Alex Gerardo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "65",
        "NOMBRE": "Xinic Xia Erin Benjamin",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "66",
        "NOMBRE": "Xujur Rompich Ever Rumualdo",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "67",
        "NOMBRE": "Ortiz Vides Carlos Humberto ",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "68",
        "NOMBRE": "Morales Juarez Renato Eduviges ",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "69",
        "NOMBRE": "Rivera Gonzalez Yorshua Edilberto ",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "70",
        "NOMBRE": "Diaz Caal Elmer Alejandro ",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "71",
        "NOMBRE": "Caal Caal William Alexander ",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "72",
        "NOMBRE": "Trujillo Morales Cristofer Jonatan ",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "73",
        "NOMBRE": "Sacu Gomez Juan Carlos ",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "74",
        "NOMBRE": "Velasquez Dicute Bryan Alexander ",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "75",
        "NOMBRE": "Rosales Portillo Carlos Enrique ",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "76",
        "NOMBRE": "Campaneros Gonzalez Erick Fernando ",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "77",
        "NOMBRE": "Estrada Rodriguez Oscar Francisco ",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "78",
        "NOMBRE": "Hernandez Mota Julissa Del Carmen ",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "79",
        "NOMBRE": "Chavez De León Erick Virgilio",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "80",
        "NOMBRE": "Yoc Cabrera Carlos Augusto",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "81",
        "NOMBRE": "Pérez Zarceño Kendall Haroldo",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "82",
        "NOMBRE": "Escobar Catzún Edgar Homero",
        "Departamento": "Finanzas"
    },
    {
        "NO.": "83",
        "NOMBRE": "Cal Cojoc Maynor Alberto",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "84",
        "NOMBRE": "Bor Galvez José Manuel",
        "Departamento": "Andamiaje"
    },
    {
        "NO.": "85",
        "NOMBRE": "Ovando Gomez Maria Fernanda",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "86",
        "NOMBRE": "Yojcom Wagner Maykool Edube",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "87",
        "NOMBRE": "Ruano Cruz Nistin Obdulio",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "88",
        "NOMBRE": "Ramos Mayen Elfry Ottoniel",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "89",
        "NOMBRE": "Pichola Gonzalez Luis Bartolo",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "90",
        "NOMBRE": "Fuentes Meza Rodrigo Alejandro",
        "Departamento": "Operaciones"
    },
    {
        "NO.": "91",
        "NOMBRE": "Cordon Solis Geffersson Omar",
        "Departamento": "Proyectos"
    },
    {
        "NO.": "92",
        "NOMBRE": "Canel Pu Jeremias",
        "Departamento": "Andamiaje"
    }
]
public findDepto(key: string): string { const departamento = this.DepartamentosHash.find(obj => Object.keys(obj)[0] === key); return departamento ? departamento[key] : null; }
public DepartamentosHash: Array<any> = [{"XHSH": "Andamiaje"},{"DFCW": "Proyectos"},{"WMVS": "Operaciones"},{"WOUD": "Finanzas"},{"KJRE": "Comercial"}]
}

