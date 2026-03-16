import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { WebsocketService } from '../../core/websocket.service';
import { LiveTransaction } from '../../shared/models/live-transaction.model';

@Component({
  selector: 'app-transaction-monitor',
  templateUrl: './transaction-monitor.component.html',
  styleUrls: ['./transaction-monitor.component.css']
})
export class TransactionMonitorComponent implements OnInit, OnDestroy {
  public transactions: LiveTransaction[] = [];
  private socketSubscription: Subscription;

  constructor(private websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.socketSubscription = this.websocketService.getLiveTransactions().subscribe(
      (newTransaction: LiveTransaction) => {
        this.transactions.unshift(newTransaction); // Add to the top of the list
        if (this.transactions.length > 50) { // Keep the list to a manageable size
          this.transactions.pop();
        }
      },
      err => console.error(err),
      () => console.warn('WebSocket connection closed')
    );
  }

  ngOnDestroy(): void {
    if (this.socketSubscription) {
      this.socketSubscription.unsubscribe();
    }
  }

  getRiskClass(decision: string): string {
    switch (decision) {
      case 'APPROVE':
        return 'risk-approve';
      case 'FLAG':
        return 'risk-flag';
      case 'BLOCK':
        return 'risk-block';
      default:
        return '';
    }
  }
}
