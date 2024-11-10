export class CatchPreferenceUser {
  #levenshtein(a: string, b: string): number {
    const matrix: number[][] = [];

    for (let i = 0; i <= b.length; i++) {
      matrix[i] = [i];
    }

    for (let j = 0; j <= a.length; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= b.length; i++) {
      for (let j = 1; j <= a.length; j++) {
        if (b.charAt(i - 1) === a.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            Math.min(matrix[i][j - 1] + 1, matrix[i - 1][j] + 1)
          );
        }
      }
    }

    return matrix[b.length][a.length];
  }

  #findClosestMatch(input: string, arr: string[]): string | null {
    let closestValue: string | null = null;
    let smallestDistance: number = Infinity;

    for (const value of arr) {
      const distance = this.#levenshtein(input, value);

      if (distance < smallestDistance) {
        smallestDistance = distance;
        closestValue = value;
      }
    }

    return closestValue;
  }

  public handle(input: string, arr: string[]) {
    return this.#findClosestMatch(input, arr);
  }
}
