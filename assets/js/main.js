// const inputRange = document.getElementById(`input-range`);
const outputPasswordLength = document.querySelector(`.password-length`);
const outputGeneratedPassword = document.querySelector(`.generated-password`);
const inputForm = document.querySelector(`form`);
const inputCopyButton = document.getElementById(`copy`);
const inputPasswordLength = document.getElementById(`input-range`);
const inputCapitalLetters = document.getElementById(`input-capital-letter`);
const inputLowerCaseLetters = document.getElementById(`input-lowercase-letter`);
const inputNumbers = document.getElementById(`input-number`);
const inputSymbols = document.getElementById(`input-symbol`);

const letters = [
	`a`,
	`b`,
	`c`,
	`d`,
	`e`,
	`f`,
	`g`,
	`h`,
	`i`,
	`j`,
	`k`,
	`l`,
	`m`,
	`n`,
	`o`,
	`p`,
	`q`,
	`r`,
	`s`,
	`t`,
	`u`,
	`v`,
	`w`,
	`x`,
	`y`,
	`z`,
];
const numbers = [`0`, `1`, `2`, `3`, `4`, `5`, `6`, `7`, `8`, `9`];
const symbols = [
	`!`,
	`§`,
	`$`,
	`%`,
	`/`,
	`(`,
	`)`,
	`=`,
	`?`,
	`+`,
	`-`,
	`[`,
	`]`,
	`{`,
	`}`,
	`*`,
	`,`,
	`;`,
	`.`,
	`:`,
	`@`,
	`^`,
];

let passwordArray = [];
let passwordGenerated = false;

const displayPasswordLength = (event) => {
	outputPasswordLength.innerHTML = `length: ${inputPasswordLength.value}`;
};

const generateRandomNumber = (paramMaxWidth) => {
	return Math.floor(Math.random() * paramMaxWidth);
};

const shuffle = (paramArray) => {
	let tmpArray = [...paramArray];
	let randomPos, tmp;
	for (let i = tmpArray.length - 1; i > 0; i--) {
		randomPos = Math.floor(Math.random() * (i + 1));
		tmp = tmpArray[i];
		tmpArray[i] = tmpArray[randomPos];
		tmpArray[randomPos] = tmp;
	}
	return tmpArray;
};

const generatePassword = (event) => {
	if (
		(event.type === "input" || event.type === `change`) &&
		!passwordGenerated
	) {
		return;
	}
	if (event.type === `submit` && !passwordGenerated) {
		passwordGenerated = true;
	}
	let data = [];
	let dataShuffled = [];
	let counter = 0;
	passwordArray = [];
	outputGeneratedPassword.innerHTML = ``;

	if (
		(inputCapitalLetters.checked === false &&
			inputLowerCaseLetters.checked === false &&
			inputNumbers.checked === false &&
			inputSymbols.checked === false) ||
		inputPasswordLength.value === 0
	) {
		return;
	}
	if (inputCapitalLetters.checked === true) {
		data.push(...shuffle(letters).map((element) => element.toUpperCase()));
	}
	if (inputLowerCaseLetters.checked === true) {
		data.push(...shuffle(letters));
	}
	if (inputNumbers.checked === true) {
		data.push(...shuffle(numbers));
	}
	if (inputSymbols.checked === true) {
		data.push(...shuffle(symbols));
	}

	for (let i = 0; i < Number(inputPasswordLength.value); i++) {
		dataShuffled = shuffle(data);
	}

	counter = 0;
	for (i = 0; i < Number(inputPasswordLength.value); i++) {
		let randomCharacter =
			dataShuffled[generateRandomNumber(dataShuffled.length)];
		passwordArray.push(randomCharacter);
		if (counter !== 0 && counter % 23 === 0) {
			outputGeneratedPassword.innerHTML += `<br>${randomCharacter}`;
		} else {
			outputGeneratedPassword.innerHTML += `${randomCharacter}`;
		}
		counter++;
	}
};

const copyPassword = async () => {
	try {
		await navigator.clipboard.writeText(passwordArray.join(``));
		console.log(`copied to clipboard: ${passwordArray.join(``)}`);
	} catch (error) {
		console.log(`failed to copy:`, error);
	}
};

inputPasswordLength.addEventListener(`input`, displayPasswordLength);
inputPasswordLength.addEventListener(`input`, generatePassword);
inputCapitalLetters.addEventListener(`change`, generatePassword);
inputLowerCaseLetters.addEventListener(`change`, generatePassword);
inputNumbers.addEventListener(`change`, generatePassword);
inputSymbols.addEventListener(`change`, generatePassword);
inputForm.addEventListener(`submit`, generatePassword);
inputCopyButton.addEventListener(`click`, copyPassword);

displayPasswordLength();
