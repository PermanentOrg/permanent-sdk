// This error was donated by the TV Kitchen project / Bad Idea Factory
// https://github.com/tvkitchen/countertop/blob/main/src/errors/ValidationError.ts
import type { ErrorObject } from "ajv";

export class ValidationError extends Error {
	public errors?: ErrorObject[] | null;

	public input?: unknown;

	public constructor(
		message?: string,
		errors?: ErrorObject[] | null,
		input?: unknown,
	) {
		super(message);
		this.name = "ValidationError";
		this.errors = errors;
		this.input = input;
	}
}
