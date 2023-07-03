import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faCross, faX } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/api/api-client.service';
import { PermissionsType } from 'src/app/api/types/users';
import { BriefLevel, FullLevel } from 'src/app/api/types/levels';

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

  confirmIcon = faCheck;
  cancelIcon = faX;

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

  onKeyDown(event: any) {
    if (event.key === 'Enter') {
      event.preventDefault();

      let levelNameInput = <HTMLHeadingElement>(
        document.getElementById(this.inputId)
      );
      levelNameInput.blur();
    }
  }

  onBlur() {
    let levelNameInput = <HTMLHeadingElement>(
      document.getElementById(this.inputId)
    );

    if (!levelNameInput.textContent) {
      levelNameInput.textContent = this.level.Name;
      return;
    }

    levelNameInput.textContent = this.enforceCharacterLimit(
      levelNameInput.textContent.trim()
    );

    if (levelNameInput.textContent == this.level.Name) return;

    this.hasNameBeenEdited = true;
  }

  cancelLevelNameChange() {
    let levelNameInput = <HTMLHeadingElement>(
      document.getElementById(this.inputId)
    );

    levelNameInput.textContent = this.level.Name;
    this.hasNameBeenEdited = false;
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

    try {
      await this.apiClient.setLevelName(
        this.level.Id,
        levelNameInput.textContent
      );
      this.level.Name = levelNameInput.textContent;
      const nowUnixMilliseconds = Date.now();
      this.level.ModificationDate = nowUnixMilliseconds / 1000;
      this.hasNameBeenEdited = false;
      this.changedName.next();
    } catch (e) {
      return this.cancelLevelNameChange();
    }
  }

  enforceCharacterLimit(input: string): string {
    input =
      input.slice(0, Math.min(maxLength, input.length)).replace(/\n/g, '') ??
      '';
    return input;
  }
}

const maxLength = 26;
