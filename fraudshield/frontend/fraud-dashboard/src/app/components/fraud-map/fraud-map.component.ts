
import { Component, AfterViewInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { LiveTransaction } from '../../shared/models/live-transaction.model';

@Component({
  selector: 'app-fraud-map',
  templateUrl: './fraud-map.component.html',
  styleUrls: ['./fraud-map.component.css']
})
export class FraudMapComponent implements AfterViewInit, OnChanges {
  private map;
  @Input() transactions: LiveTransaction[] = [];

  // Define custom icons for the map markers
  private greenIcon = L.icon({
    iconUrl: 'assets/marker-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  private redIcon = L.icon({
    iconUrl: 'assets/marker-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && this.map) {
      this.updateMap();
    }
  }

  private initMap(): void {
    this.map = L.map('map', {
      center: [1.3521, 103.8198], // Center on Singapore
      zoom: 4
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(this.map);
  }

  private updateMap(): void {
    // Clear existing markers
    this.map.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.map.removeLayer(layer);
      }
    });

    // Add new markers for each transaction
    this.transactions.forEach(item => {
      const location = item.transaction.location;
      const icon = item.risk_analysis.decision === 'BLOCK' ? this.redIcon : this.greenIcon;
      
      const marker = L.marker([location.lat, location.lon], { icon: icon }).addTo(this.map);
      marker.bindPopup(`<b>${item.transaction.user_id}</b><br>${item.transaction.amount} USD<br>${item.risk_analysis.decision}`);
    });
  }
}
