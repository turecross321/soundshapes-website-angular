import { Component, EventEmitter, Input, Output } from '@angular/core';
import { faCheck, faCross, faX } from '@fortawesome/free-solid-svg-icons';
import { ApiClientService } from 'src/app/services/api-client.service';
import { PermissionsType } from 'src/app/types/api/users';
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

    const response = await this.apiClient.setLevelName(
      this.level.Id,
      levelNameInput.textContent
    );

    if (response.status != 201) {
      return this.cancelLevelNameChange();
    }

    this.level.Name = levelNameInput.textContent;
    this.level.ModificationDate = new Date();
    this.changedName.next();
    this.hasNameBeenEdited = false;
  }

  enforceCharacterLimit(input: string): string {
    input =
      input.slice(0, Math.min(maxLength, input.length)).replace(/\n/g, '') ??
      '';
    return input;
  }
}

const maxLength = 26;
