export class JapaneseNumberConverter {
	private readonly units: string[] = ['', '万', '億', '兆', '京', '垓', '秭', '穣', '溝', '澗', '正', '載', '極', '恒河沙', '阿僧祇', '那由他', '不可思議', '無量大数'];

	public convert(input: string): string {
		const num = this.parseInput(input);
		if (num === BigInt(0)) {
			return '0';
		}

		let result = this.convertLargeNumber(num);
		result = this.applySpecialCases(result, num);

		return result;
	}

	private parseInput(input: string): bigint {
		return BigInt(input.replace(/[_,]/g, ''));
	}

	private convertLargeNumber(num: bigint): string {
		let result = '';
		let tempNum = num;

		for (let i = 0; i < this.units.length; i++) {
			const part = Number(tempNum % BigInt(10000));
			if (part > 0 || (i === 0 && tempNum === BigInt(0))) {
				result = this.convertPart(part, i) + this.units[i] + result;
			}
			tempNum = tempNum / BigInt(10000);
			if (tempNum === BigInt(0)) break;
		}

		return result;
	}

	private convertPart(part: number, unitIndex: number): string {
		if (part === 0) return '';
		if (unitIndex > 0) {
			return part === 1 ? '1' : part.toString();
		} else {
			return part.toString();
		}
	}

	private applySpecialCases(result: string, num: bigint): string {
		// 1000から9999までの数値はそのまま文字列として返す
		if (num >= BigInt(1000) && num < BigInt(10000)) {
			return num.toString();
		}

		// 無量大数を超える数値の処理
		const maxUnit = this.units[this.units.length - 1];
		if (result.includes(maxUnit)) {
			const parts = result.split(maxUnit);
			if (parts.length > 1) {
				// 無量大数の前の部分を処理
				let prefix = parts[0];
				if (prefix === '1000') {
					prefix = '1';
				} else if (prefix.endsWith('000')) {
					prefix = prefix.slice(0, -3);
				} else {
					// 1000不可思議のような場合を処理
					const lastUnit = this.units[this.units.length - 2];
					if (prefix.includes(lastUnit)) {
						const [prePart, postPart] = prefix.split(lastUnit);
						if (postPart === '1000') {
							prefix = (prePart === '' ? '1' : prePart) + lastUnit;
						}
					}
				}

				// 無量大数の後の部分を処理
				const suffix = parts[1] !== '' ? parts[1] : '';

				result = prefix + maxUnit + suffix;
			}
		}

		return result;
	}
}