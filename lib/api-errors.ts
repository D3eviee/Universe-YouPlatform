export type Issue = { path: string; message: string };

/** A failed save. `issues` lists which fields were wrong. */
export class SaveError extends Error {
  constructor(message: string, public issues: Issue[] = []) {
    super(message);
    this.name = "SaveError";
  }
}

export class UploadError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UploadError";
  }
}