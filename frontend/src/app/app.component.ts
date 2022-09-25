import { Component, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { SearchService } from './shared/services/search.service';
import { AuthService } from './shared/services/auth.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'desafio';
  usuarioAutenticado = false;
  onDestory$ = new Subject();

  constructor(
    private search: SearchService,
    private authService: AuthService,
    private router: Router
  ) {
    this.usuarioAutenticado = this.authService.usuarioAutenticado;
    this.authService.quandoUsuarioAutenticarEvento
      .pipe(takeUntil(this.onDestory$))
      .subscribe((estaAutenticado) => {
        this.usuarioAutenticado = estaAutenticado;
      });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  ngOnDestroy(): void {
    this.onDestory$.next();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.search.onSearch(input.value);
  }
}
