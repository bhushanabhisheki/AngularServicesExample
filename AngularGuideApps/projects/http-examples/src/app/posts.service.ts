import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  baseUrl: string =
    'https://newsample-fab58-default-rtdb.firebaseio.com/posts.json';
  constructor(private http: HttpClient) {}

  createAndStorePost(title: string, content: string) {
    const postData: Post = { title: title, content: content };
    return this.http.post<{ name: string }>(this.baseUrl, postData);
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(this.baseUrl).pipe(
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
    return this.http.delete(this.baseUrl);
  }
}
