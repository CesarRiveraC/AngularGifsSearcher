import { Component } from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {

    public get historial() {
       return this.gifsService.historial;
    }

    public buscar(gifName: string) {
        this.gifsService.buscarGifs(gifName);
    }

  constructor(private gifsService: GifsService) { }
}
