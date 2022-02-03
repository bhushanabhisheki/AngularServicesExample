import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetchingPosts: boolean = false;
  error?: string;
  baseUrl: string =
    'https://newsample-fab58-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetchingPosts = true;
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isFetchingPosts = false;
      },
      catchError((error) => {
        return throwError(error);
      })
    );
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postsService
      .createAndStorePost(postData.title, postData.content)
      .subscribe((data) => {
        this.onFetchPosts();
      });
  }

  onFetchPosts() {
    this.isFetchingPosts = true;
    // Send Http request
    this.postsService.fetchPosts().subscribe(
      (posts) => {
        this.loadedPosts = posts;
        this.isFetchingPosts = false;
      },
      (err) => {
        this.error = err.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe((data) => {
      this.onFetchPosts();
    });
  }
}
