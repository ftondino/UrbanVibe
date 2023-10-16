import { Component, OnInit } from "@angular/core";
import { UsersService } from "../../services/users.service";
import { User } from "src/app/Models/user.model";
import { ActivatedRoute } from "@angular/router";
import { FeedService } from "src/app/features/feed/services/feed.service";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    public feedService: FeedService
  ) {}

  ngOnInit() {
    // DETTAGLI DELL'USER
    const id = Number(this.route.snapshot.paramMap.get("id"));
    this.usersService.users$.subscribe((users) => {
      this.user = users.find((user) => user.id === id);
    });

    // POST DELL'USER CON I RISPETTIVI COMMENTI
    this.feedService.getPosts(id);
  }
}
