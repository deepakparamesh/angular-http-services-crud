import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { AppError } from '../common/app.error';
import { NotFoundError } from '../common/not-found-error';
import { MalformError } from '../common/malform.error';

@Injectable({
  providedIn: 'root'
})

export class DataService {

  constructor(private url: string, private http: Http) { }


  getAll() {
    return this.http.get(this.url)
      .pipe(
        map(response => response.json()),
        catchError(this.handleError));
  }

  create(post) {
    return this.http.post(this.url, post)
      .pipe(catchError(this.handleError));
  }

  update(post, data) {
    return this.http.patch(this.url + '/' + post.id, data)
      .pipe(
        map(response => response.json()),
        catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe(
        map(response => response.json()),
        catchError(this.handleError));
  }

  private handleError(error: Response) {
    if (error.status === 400) {
      return throwError(new MalformError(error.json()));
    }
    if (error.status === 404) {
      return throwError(new NotFoundError());
    }
    return throwError(new AppError(error.json()));
  }

}
