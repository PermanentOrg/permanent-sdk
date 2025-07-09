export const generateEnumTypeguard =
	<GenericEnum extends object>(genericEnum: GenericEnum) =>
	(value: unknown): value is GenericEnum[keyof GenericEnum] =>
		Object.values(genericEnum).some((v) => v === value);
