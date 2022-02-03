import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetchingPosts: boolean = false;
  baseUrl: string =
    'https://newsample-fab58-default-rtdb.firebaseio.com/posts.json';

  constructor(private http: HttpClient, private postsService: PostsService) {}

  ngOnInit() {
    this.isFetchingPosts = true;
    this.postsService.fetchPosts().subscribe((posts) => {
      this.loadedPosts = posts;
      this.isFetchingPosts = false;
    });
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
    this.postsService.fetchPosts().subscribe((posts) => {
      this.loadedPosts = posts;
      this.isFetchingPosts = false;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postsService.deletePosts().subscribe((data) => {
      this.onFetchPosts();
    });
  }
}
