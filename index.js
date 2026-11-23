
/* ========================================
   GYARUPI - JAVASCRIPT PRINCIPAL
   HOME + COLEÇÃO + FAVORITOS + SACOLA
======================================== */


/* ========================================
   1. FAVORITAR PRODUTOS
======================================== */

const favoritos = document.querySelectorAll(".favorito");

favoritos.forEach(function (botao) {

    botao.addEventListener("click", function () {

        botao.classList.toggle("selecionado");

        if (botao.classList.contains("selecionado")) {
            botao.textContent = "♥";
        } else {
            botao.textContent = "♡";
        }

    });

});


/* ========================================
   2. PAINEL DE FAVORITOS
======================================== */

const botaoFavoritos = document.querySelector(".botao-favoritos");
const painelFavoritos = document.querySelector("#painel-favoritos");
const fundoFavoritos = document.querySelector("#favoritos-fundo");
const fecharFavoritos = document.querySelector("#fechar-favoritos");
const favoritosConteudo = document.querySelector("#favoritos-conteudo");


function fecharPainelFavoritos() {

    if (!painelFavoritos || !fundoFavoritos) return;

    painelFavoritos.classList.remove("aberto");
    fundoFavoritos.classList.remove("aberto");

}


if (botaoFavoritos && painelFavoritos && fundoFavoritos && favoritosConteudo) {

    botaoFavoritos.addEventListener("click", function () {

        painelFavoritos.classList.add("aberto");
        fundoFavoritos.classList.add("aberto");

        const coracoes = document.querySelectorAll(".favorito.selecionado");

        favoritosConteudo.innerHTML = "";

        if (coracoes.length === 0) {

            favoritosConteudo.innerHTML = `
                <div class="favoritos-vazio">
                    <span>♡</span>
                    <p>Você ainda não favoritou nenhum produto.</p>
                </div>
            `;

            return;

        }

        coracoes.forEach(function (coracao) {

            const produto = coracao.closest(".produto");

            if (!produto) return;

            const nome = produto.querySelector("h3")?.textContent.trim() || "Produto Gyarupi";
            const preco = produto.querySelector(".produto-preco")?.textContent.trim() || "";
            const imagem = produto.querySelector("img")?.src || "";

            const item = document.createElement("div");

            item.classList.add("item-favorito");

            item.innerHTML = `
                <img
                    src="${imagem}"
                    alt="${nome}"
                    class="item-favorito-imagem"
                >

                <div class="item-favorito-info">

                    <p class="item-favorito-mini">
                        GYARUPI ♡
                    </p>

                    <h3>${nome}</h3>

                    <p class="item-favorito-preco">
                        ${preco}
                    </p>

                </div>
            `;

            favoritosConteudo.appendChild(item);

        });

    });


    if (fecharFavoritos) {

        fecharFavoritos.addEventListener("click", fecharPainelFavoritos);

    }

    fundoFavoritos.addEventListener("click", fecharPainelFavoritos);

}


/* ========================================
   3. SACOLA
======================================== */

const botaoSacola = document.querySelector(".botao-sacola");
const painelSacola = document.querySelector("#painel-sacola");
const fundoSacola = document.querySelector("#sacola-fundo");
const fecharSacola = document.querySelector("#fechar-sacola");

const sacolaConteudo = document.querySelector("#sacola-conteudo");
const sacolaTotal = document.querySelector("#sacola-total");

let quantidadeSacola = 0;
let totalSacola = 0;


/* ========================================
   4. ABRIR E FECHAR SACOLA
======================================== */

function fecharPainelSacola() {

    if (!painelSacola || !fundoSacola) return;

    painelSacola.classList.remove("aberto");
    fundoSacola.classList.remove("aberto");

}


if (botaoSacola && painelSacola && fundoSacola) {

    botaoSacola.addEventListener("click", function () {

        painelSacola.classList.add("aberto");
        fundoSacola.classList.add("aberto");

    });

    if (fecharSacola) {

        fecharSacola.addEventListener("click", fecharPainelSacola);

    }

    fundoSacola.addEventListener("click", fecharPainelSacola);

}


/* ========================================
   5. ADICIONAR PRODUTOS À SACOLA
======================================== */

const botoesAdicionarSacola = document.querySelectorAll(".adicionar-sacola");


botoesAdicionarSacola.forEach(function (botao) {

    botao.addEventListener("click", function () {

        const produto = botao.closest(".produto");

        if (!produto || !sacolaConteudo || !sacolaTotal) return;

        const nome = produto.querySelector("h3")?.textContent.trim() || "Produto Gyarupi";

        const precoTexto = produto.querySelector(".produto-preco")?.textContent.trim() || "R$ 0,00";

        const preco = Number(
            precoTexto
                .replace("R$", "")
                .replace(/\./g, "")
                .replace(",", ".")
                .trim()
        );

        if (!Number.isFinite(preco)) return;


        // Atualiza quantidade e total

        quantidadeSacola++;
        totalSacola += preco;


        // Remove mensagem de sacola vazia

        const sacolaVazia = sacolaConteudo.querySelector(".sacola-vazia");

        if (sacolaVazia) {
            sacolaVazia.remove();
        }


        // Cria o item

        const item = document.createElement("div");

        item.classList.add("item-sacola");

        item.innerHTML = `
            <div class="item-sacola-info">

                <p class="item-nome">
                    ${nome}
                </p>

                <p class="item-preco">
                    ${precoTexto}
                </p>

            </div>

            <button
                class="remover-item"
                type="button"
                aria-label="Remover ${nome}"
            >
                ×
            </button>
        `;

        sacolaConteudo.appendChild(item);


        // Remover produto

        const botaoRemover = item.querySelector(".remover-item");

        botaoRemover.addEventListener("click", function () {

            item.remove();

            quantidadeSacola = Math.max(0, quantidadeSacola - 1);

            totalSacola = Math.max(0, totalSacola - preco);

            atualizarSacola();
            atualizarTotal();


            // Se a sacola ficar vazia

            if (quantidadeSacola === 0) {

                sacolaConteudo.innerHTML = `
                    <div class="sacola-vazia">
                        <span>♡</span>
                        <p>Sua sacola está vazia.</p>
                    </div>
                `;

            }

        });


        atualizarSacola();
        atualizarTotal();

    });

});


/* ========================================
   6. ATUALIZAR CONTADOR DA SACOLA
======================================== */

function atualizarSacola() {

    if (!botaoSacola) return;

    if (quantidadeSacola === 0) {

        botaoSacola.textContent = "🛍 Sacola";

    } else {

        botaoSacola.textContent =
            "🛍 Sacola (" + quantidadeSacola + ")";

    }

}


/* ========================================
   7. ATUALIZAR TOTAL
======================================== */

function atualizarTotal() {

    if (!sacolaTotal) return;

    sacolaTotal.textContent = totalSacola.toLocaleString(
        "pt-BR",
        {
            style: "currency",
            currency: "BRL"
        }
    );

}


/* ========================================
   8. FINALIZAR COMPRA
======================================== */

const finalizarCompra = document.querySelector(".finalizar-compra");

if (finalizarCompra) {

    finalizarCompra.addEventListener("click", function () {

        window.location.href = "checkout.html";

    });

}


/* ========================================
   9. FILTROS DA COLEÇÃO
   ROUPAS + ACESSÓRIOS + BOLSAS
======================================== */

const botoesFiltro = document.querySelectorAll(".filtro");

const produtosColecao = document.querySelectorAll(
    ".catalogo .produto"
);

const tituloColecao = document.querySelector("#titulo-colecao");


// Descobre o estilo escolhido na HOME

const parametros = new URLSearchParams(window.location.search);

let estiloSelecionado = parametros.get("estilo") || "todos";


// Nomes dos estilos

const nomesEstilos = {

    rokku: "ROKKU",
    himegyaru: "HIMEGYARU",
    tsuyome: "TSUYOME",
    manba: "MANBA",
    kogyaru: "KOGYARU",
    agejo: "AGEJO"

};


// Atualiza o título da coleção

if (tituloColecao) {

    if (nomesEstilos[estiloSelecionado]) {

        tituloColecao.textContent =
            "COLEÇÃO " + nomesEstilos[estiloSelecionado];

    } else {

        tituloColecao.textContent = "COLEÇÃO";

    }

}


// Categoria selecionada

let categoriaSelecionada = "todos";


// Função que filtra os produtos

function atualizarColecao() {

    produtosColecao.forEach(function (produto) {

        const categoriaCorreta =
            categoriaSelecionada === "todos" ||
            produto.classList.contains(categoriaSelecionada);

        const estiloProduto = produto.dataset.estilo;

        const estiloCorreto =
            estiloSelecionado === "todos" ||
            estiloProduto === estiloSelecionado ||
            estiloProduto === "geral";


        if (categoriaCorreta && estiloCorreto) {

            produto.style.display = "";

        } else {

            produto.style.display = "none";

        }

    });

}


// Executa ao abrir a coleção

atualizarColecao();


// Botões de categoria

botoesFiltro.forEach(function (botao) {

    botao.addEventListener("click", function () {

        categoriaSelecionada = botao.dataset.filtro;

        botoesFiltro.forEach(function (outroBotao) {

            outroBotao.classList.remove("ativo");

        });

        botao.classList.add("ativo");

        atualizarColecao();

    });

});


/* ========================================
   GYARUPI CARREGADA ♡
======================================== */

console.log("GYARUPI carregou com sucesso ♡");
