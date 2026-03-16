
import { Component } from '@angular/core';
import { ApiService } from '../../core/api.service';

@Component({
  selector: 'app-fraud-simulator',
  templateUrl: './fraud-simulator.component.html',
  styleUrls: ['./fraud-simulator.component.css']
})
export class FraudSimulatorComponent {
  simulationResult: string;

  constructor(private apiService: ApiService) { }

  simulateAttack(): void {
    this.apiService.simulateAttack(20).subscribe(response => {
      this.simulationResult = response.message;
    });
  }
}
