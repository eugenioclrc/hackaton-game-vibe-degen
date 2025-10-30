import { json, type RequestHandler } from '@sveltejs/kit';
import { createWalletClient, http, parseEther } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { scrollSepolia } from 'viem/chains';

import { PRIVATE_KEY } from '$env/static/private';
import { CONTRACT_ADDRESS } from '$env/static/private';


// Validar que la private key esté configurada
if (!PRIVATE_KEY) {
	throw new Error('PRIVATE_KEY no está definida en el archivo .env');
}

// Validar formato de private key
if (!PRIVATE_KEY.startsWith('0x')) {
	throw new Error('PRIVATE_KEY debe empezar con 0x');
}

const privateKey = PRIVATE_KEY as `0x${string}`;

// Crear cuenta desde la private key
const account = privateKeyToAccount(privateKey as `0x${string}`);

// Crear wallet client
const walletClient = createWalletClient({
	account,
	chain: scrollSepolia,
	transport: http(),
});

// Dirección del contrato (debe estar en .env o aquí)

// ABI básico del contrato mint (ajustar según tu contrato)
const MINT_ABI = [
	{
		inputs: [
			{ internalType: 'address', name: 'to', type: 'address' },
			{ internalType: 'uint256', name: 'amount', type: 'uint256' }
		],
		name: 'mint',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function'
	}
] as const;

export const POST: RequestHandler = async ({ request }) => {
	try {
		const body = await request.json();
		const { wallet, amount } = body;

		// Validar parámetros
		if (!wallet) {
			return json({ error: 'La dirección de wallet es requerida' }, { status: 400 });
		}

		if (!amount || amount <= 0) {
			return json({ error: 'La cantidad de tokens debe ser mayor a 0' }, { status: 400 });
		}

		// Validar formato de wallet
		if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
			return json({ error: 'Dirección de wallet inválida' }, { status: 400 });
		}

		// Convertir amount a wei (ajustar decimales según tu token, aquí asumo 18)
		const amountInWei = parseInt(amount.toString());

		// Verificar que el contrato esté configurado
		if (CONTRACT_ADDRESS === '0x...') {
			return json(
				{ error: 'CONTRACT_ADDRESS no está configurada' },
				{ status: 500 }
			);
		}

		// Realizar el mint
		const hash = await walletClient.writeContract({
			account,
			address: CONTRACT_ADDRESS,
			abi: MINT_ABI,
			functionName: 'mint',
			args: [wallet as `0x${string}`, amountInWei],
		});

		return json({
			success: true,
			transactionHash: hash,
			wallet,
			amount: amount.toString(),
		});
	} catch (error) {
		console.error('Error al mintear tokens:', error);
		
		// Manejar errores específicos de viem
		if (error instanceof Error) {
			return json(
				{
					error: 'Error al procesar la transacción',
					message: error.message,
				},
				{ status: 500 }
			);
		}

		return json(
			{ error: 'Error interno del servidor' },
			{ status: 500 }
		);
	}
};
