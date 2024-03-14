import fs from 'fs';

interface SchemaProperty {
	type: string;
	required: boolean;
}

interface Schema {
	type: string;
	properties: {
		[key: string]: SchemaProperty;
	};
}

export default class JSONSchemaValidator {
	
    async getSchemaFromFile(filePath: string): Promise<Schema> {
        try {
            const schemaData = await fs.promises.readFile(filePath, 'utf-8');
            const schemaObject: Schema = JSON.parse(schemaData);
            return schemaObject;
        } catch (error) {
            console.error(`Error reading schema from file: ${error}`);
            throw error;
        }
    }

	async validateSchema(data: any, filePath: string): Promise<boolean> {
        const schema = await this.getSchemaFromFile(filePath)
		const schemaKeys = Object.keys(schema.properties);
		const dataKeys = Object.keys(data);

		for (const key of schemaKeys) {
			const property = schema.properties[key];
			if (property.required && !(key in data)) {
				console.error(`Missing required property '${key}' in data.`);
				return false;
			}
		}

		for (const key of dataKeys) {
			if (!schemaKeys.includes(key)) {
				console.error(`Unexpected property '${key}' found in data.`);
				return false;
			}
		}

		for (const key of schemaKeys) {
			const property = schema.properties[key];
			if (key in data) {
				const expectedType = property.type;
				const actualType = typeof data[key];
				if (actualType !== expectedType) {
					console.error(
						`Property '${key}' has type '${actualType}', expected type '${expectedType}'.`
					);
					return false;
				}
			}
		}
		return true;
	}
}
