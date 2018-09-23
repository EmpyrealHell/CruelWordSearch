//our root app component
import { Component, NgModule, VERSION } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

export type PlacementFunction = ((word:string, x: number, y: number, rows: Table, affix?: string) => boolean);

export class Table {
    public static readonly nbsp = '\u00A0';

    public rows: number;
    public columns: number;
    public data: Array<Array<string>>;

    public constructor(rows: number, columns: number) {
        this.resize(rows, columns);
    }

    public resize(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this.data = new Array<Array<string>>(this.rows);
        for (let i = 0; i < this.rows; i++) {
            this.data[i] = new Array<string>(this.columns);
            for (let j = 0; j < this.columns; j++) {
                this.data[i][j] = Table.nbsp;
            }
        }
    }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    public word: string;
    public width: number;
    public height: number;
    public retryCount: number;
    public count: number;
    public data: Table;

    constructor() {
        this.width = 10;
        this.height = 10;
        this.word = '';
        this.retryCount = 20;
        this.data = new Table(this.height, this.width);
    }
    
    public static random(lowerBound: number, upperBound: number): number {
        return Math.floor(Math.random() * (upperBound - lowerBound)) + lowerBound;
    }

    public static placeLetters(word: string, x: number, y: number, table: Table, xDir: number, yDir: number, affix?: string): boolean {
        let width = table.columns;
        let height = table.rows;

        let xEnd = x + word.length * xDir;
        let yEnd = y + word.length * yDir;

        let xStart = x;
        if (xStart > xEnd) {
            xStart = xEnd;
            xEnd = x;
        }

        let yStart = y;
        if (yStart > yEnd) {
            yStart = yEnd;
            yEnd = y;
        }

        if (xStart < 0 || yStart < 0 || xEnd >= width || yEnd >= height) {
            return false;
        }
        for (let i = 0; i < word.length; i++) {
            if (table.data[y + i * yDir][x + i * xDir] != Table.nbsp)
                return false;
        }
        for (let i = 0; i < word.length; i++) {
            let char = word.substr(i, 1);
            if (affix) {
                char += affix;
            }
            table.data[y + i * yDir][x + i * xDir] = char;
        }
        return true;
    }

    public static placeLtR(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, 1, 0, affix);
    }

    public static placeRtL(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, -1, 0, affix);
    }

    public static placeTtB(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, 0, 1, affix);
    }

    public static placeBtT(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, 0, -1, affix);
    }

    public static placeDDR(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, 1, 1, affix);
    }

    public static placeDDL(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, -1, 1, affix);
    }

    public static placeDUR(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, 1, -1, affix);
    }

    public static placeDUL(word: string, x: number, y: number, table: Table, affix?: string): boolean {
        return AppComponent.placeLetters(word, x, y, table, -1, -1, affix);
    }

    public static listAlgorithms(length: number, width: number, height: number): PlacementFunction[] {
        let arrangements = new Array<PlacementFunction>();
        let canHorizontal = length <= width;
        let canVertical = length <= height;
        if (canHorizontal) {
            arrangements.push(AppComponent.placeLtR);
            arrangements.push(AppComponent.placeRtL);
            if (canVertical) {
                arrangements.push(AppComponent.placeDDL);
                arrangements.push(AppComponent.placeDDR);
                arrangements.push(AppComponent.placeDUL);
                arrangements.push(AppComponent.placeDUR);
            }
        }
        if (canVertical) {
            arrangements.push(AppComponent.placeTtB);
            arrangements.push(AppComponent.placeBtT);
        }
        return arrangements;
    }

    public static placeWord(word: string, algs: PlacementFunction[], table: Table): boolean {
        let x = AppComponent.random(0, table.columns);
        let y = AppComponent.random(0, table.rows);
        let alg = AppComponent.random(0, algs.length);
        return algs[alg](word, x, y, table);
    }

    public static placeWordPart(word: string, algs: PlacementFunction[], table: Table, minLength: number, maxLength: number): number {
        let segmentLength = AppComponent.random(minLength, maxLength);
        let segmentStart = AppComponent.random(0, word.length - segmentLength);
        let segment = word.substr(segmentStart, segmentLength);
        if (AppComponent.placeWord(segment, algs, table)) {
            return segment.length;
        }
        return 0;
    }

    public static findWordInDirection(word: string, xStart: number, yStart: number, xDir: number, yDir: number, table: Table): boolean {
        for (let i = 0; i < word.length; i++) {
            let x = xStart + i * xDir;
            let y = yStart + i * yDir;
            if (x < 0 || x >= table.columns || y < 0 || y >= table.rows || table.data[y][x] != word.substr(i, 1))
                return false;
        }
        return true;
    }

    public static findWord(word: string, x: number, y: number, table: Table): number {
        let count = 0;
        for (let xDir = -1; xDir <= 1; xDir++) {
            for (let yDir = -1; yDir <= 1; yDir++) {
                if (AppComponent.findWordInDirection(word, x, y, xDir, yDir, table)) {
                    count++;
                }
            }
        }
        return count;
    }

    generate() {
        this.data.resize(this.height, this.width);
        this.word = this.word.toUpperCase();
        let arrangements = AppComponent.listAlgorithms(this.word.length, this.width, this.height);
        for (let i = 0; i < this.retryCount; i++) {
            if (AppComponent.placeWord(this.word, arrangements, this.data)) {
                break;
            }
        }
        let remaining = this.width * this.height - this.word.length;
        let min = 2;
        let max = this.word.length - 1;
        let attemptMax = this.width * this.height * 100;
        for (let i = 0; i < attemptMax && remaining > 0; i++) {
            remaining -= AppComponent.placeWordPart(this.word, arrangements, this.data, min, max);
        }
        while (remaining > 0) {
            remaining -= AppComponent.placeWordPart(this.word, arrangements, this.data, 1, 1);
        }
        this.count = 0;
        for (let i = 0; i < this.data.rows; i++) {
            for (let j = 0; j < this.data.columns; j++) {
                this.count += AppComponent.findWord(this.word, j, i, this.data);
            }
        }
    }
}