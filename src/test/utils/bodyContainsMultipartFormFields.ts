// This function is a bit complex but it ultimately is converting
// an expected "object" into a series of regular expressions that
// checks to see if that object was properly written to multipart
// form data.  Multipart forms are silly.
// https://www.ietf.org/rfc/rfc2388.txt
export const bodyContainsMultipartFormFields = (
	body: unknown,
	expectedParts: Record<string, string>,
): boolean => {
	if (typeof body !== "string") {
		return false;
	}
	const parts = body.split(/--+\d+/g);
	return Object.keys(expectedParts).reduce<boolean>((doesMatch, partName) => {
		const regex = new RegExp(
			`form-data; name="${partName}[^]*${expectedParts[partName]}`,
			"m",
		);
		return doesMatch && parts.some((part) => regex.test(part));
	}, true);
};
