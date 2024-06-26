export interface IIngredient {
	_id: string;
	id?: number;
	name: string;
	type: string;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	count?: number;
	hiddenIngredientsNumber?: number;
}
