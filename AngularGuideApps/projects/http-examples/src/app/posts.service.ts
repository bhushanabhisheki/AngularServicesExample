import { Injectable } from '@angular/core';
import { Post } from './post.model';
import {
  HttpClient,
  HttpEventType,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl: string =
    'https://newsample-fab58-default-rtdb.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    return this.http.post<{ name: string }>(this.baseUrl, postData, {
      observe: 'body',
    });
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http
      .get<{ [key: string]: Post }>(this.baseUrl, {
        headers: { 'custom-header': 'my customer header' },
        params: searchParams,
      })
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const postArray: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              postArray.push({ ...responseData[key], id: key });
            }
          }

          return postArray;
        })
      );
  }

  deletePosts() {
    return this.http
      .delete(this.baseUrl, {
        observe: 'events',
        responseType: 'text',
      })
      .pipe(
        tap((event) => {
          if (event.type === HttpEventType.Sent)
            console.log('request has been sent..');
          if (event.type === HttpEventType.Response) console.log(event.body);
        })
      );
  }
}
