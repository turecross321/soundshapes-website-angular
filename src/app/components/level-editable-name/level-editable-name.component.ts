import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiClientService } from 'src/app/services/api-client.service';
import { PermissionsType } from 'src/app/types/api/account';
import { BriefLevel, FullLevel } from 'src/app/types/api/levels';

@Component({
  selector: 'app-level-editable-name',
  templateUrl: './level-editable-name.component.html',
  styleUrls: ['./level-editable-name.component.scss'],
})
export class LevelEditableNameComponent {
  @Input() level!: FullLevel;
  @Output() changedName = new EventEmitter<void>();

  inputId = 'levelName';
  isNameEditable = false;

  hasNameBeenEdited = false;

  constructor(private apiClient: ApiClientService) {}

  ngOnInit() {
    this.apiClient.session$.subscribe((session) => {
      if (session) {
        if (
          session.User.Id == this.level.Author.Id ||
          session.User.PermissionsType >= PermissionsType.Moderator
        ) {
          this.isNameEditable = true;
        }
      }
    });
  }

  onFocusOut() {
    let levelNameInput = <HTMLHeadingElement>(
      document.getElementById(this.inputId)
    );
    levelNameInput.textContent = this.level.Name;
  }

  onKeyDown(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();

      let levelNameInput = <HTMLHeadingElement>(
        document.getElementById(this.inputId)
      );

      this.changeLevelName();
      levelNameInput.blur();
    }
  }

  async changeLevelName() {
    let levelNameInput = <HTMLHeadingElement>(
      document.getElementById(this.inputId)
    );

    if (!levelNameInput.textContent) return;

    levelNameInput.textContent = this.enforceCharacterLimit(
      levelNameInput.textContent.trim()
    );

    if (levelNameInput.textContent == this.level.Name) return;

    const response = await this.apiClient.setLevelName(
      this.level.Id,
      levelNameInput.textContent
    );

    if (response.status != 201) {
      levelNameInput.textContent = this.level.Name;
      return;
    }

    this.level.Name = levelNameInput.textContent;
    this.level.ModificationDate = new Date();
    this.changedName.next();
  }

  enforceCharacterLimit(input: string): string {
    input =
      input.slice(0, Math.min(maxLength, input.length)).replace(/\n/g, '') ??
      '';
    return input;
  }
}

const maxLength = 26;
