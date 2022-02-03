import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  baseUrl: string =
    'https://newsample-fab58-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchPosts();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    console.log(postData);
    this.http
      .post<{ name: string }>(this.baseUrl, postData)
      .subscribe((responseData) => {
        console.log(responseData.name);
        this.fetchPosts();
      });
  }

  private fetchPosts() {
    this.http
      .get<{ [key: string]: Post }>(this.baseUrl)
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
      )
      .subscribe((posts: Post[]) => {
        console.log(posts);
        this.loadedPosts = posts;
      });
  }

  onFetchPosts() {
    // Send Http request
    this.fetchPosts();
  }

  onClearPosts() {
    // Send Http request
  }
}
