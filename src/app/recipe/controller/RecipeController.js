class RecipeController {
  async getRecipes(req, res) {
    return res.status(200).send({ ok: true });
  }
}

export default new RecipeController();
