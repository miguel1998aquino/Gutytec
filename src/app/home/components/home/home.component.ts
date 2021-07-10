import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/core/services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  tienda:any;

  constructor(private homeService: HomeService) { }

  ngOnInit(): void {
    this.traerTienda()
  }

  traerTienda(){
    this.homeService.verHome().subscribe(
      response => {
        this.tienda= response
      }
    )
  }
}
