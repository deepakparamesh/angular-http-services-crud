import { Component, OnInit } from '@angular/core';
import { PostService } from '../services/post.service';
import { AppError } from '../common/app.error';
import { NotFoundError } from '../common/not-found-error';
import { MalformError } from '../common/malform.error';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  posts: any[];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.postService.getAll()
      .subscribe(posts => this.posts = posts);
  }

  createPost(input: HTMLInputElement) {
    const post = { title: input.value };
    input.value = '';

    this.postService.create(post)
    .subscribe(
      newPost => {
        post['id'] = newPost['id'];
        this.posts.splice(0, 0, post);
      },
    (error: Response) => {
        if (error instanceof MalformError) {
          // this.form.setErrors(error.json)
        } else {
          throw error;
        }
    });
  }

  updatePost(post) {
    this.postService.update(post, JSON.stringify({ isRead: true }))
    .subscribe(
    updatedPost => { alert('successfully updated as read'); },
    (error: Response) => {
      if (error instanceof MalformError) {
        // this.form.setErrors(error.json)
      } else {
        throw error;
      }
    });
  }

  deletePost(post) {
    this.postService.delete(1)
    .subscribe(() => {
        const index = this.posts.indexOf(post);
        this.posts.splice(index, 1);
      },
      (error: AppError) => {
        if (error instanceof NotFoundError) {
          alert('this post is already deleted');
        } else {
          throw error;
        }
      });
  }

}
