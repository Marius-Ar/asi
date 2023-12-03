export class Serializable {
    public serialize(): any {
        const transform = (obj: any) => {
            if (obj === null || typeof obj !== 'object') {
                return obj;
            }

            if (!(obj instanceof Serializable)) {
                return obj;
            }

            if (Array.isArray(obj)) {
                return obj.map(transform);
            }

            const newObj = {};
            Object.keys(obj).forEach(key => {
                const newKey = key.startsWith('_') ? key.slice(1) : key;
                newObj[newKey] = transform(obj[key]);
            });
            return newObj;
        };

        return transform(this);
    }
}