// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ForunsForms = ({ id_forum }) => {
//     const [id_usuario, setIdUsuario] = useState(null);
//     const [numeroProtocolo, setNumeroProtocolo] = useState('');
//     const [comentario, setComentario] = useState('');
//     const [avaliacao, setAvaliacao] = useState(null);
//     const [horarioChegada, setHorarioChegada] = useState('');
//     const [horarioSaida, setHorarioSaida] = useState('');
//     const [error, setError] = useState('');

//     // Pega o ID do usuário do localStorage ao carregar o componente
//     useEffect(() => {
//         const user = JSON.parse(localStorage.getItem('usuarios'));
//         if (user && user.id) {
//             setIdUsuario(user.id);
//         } else {
//             setError("Usuário não encontrado no localStorage");
//         }
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log("Dados a serem enviados:", {
//             id_usuario: id_usuario,
//             id_forum: id_forum,
//             numero_protocolo: numeroProtocolo,
//             comentario: comentario || null,
//             avaliacao: avaliacao,
//             horario_chegada: horarioChegada || null,
//             horario_saida: horarioSaida || null,
//         });

//         if (!id_usuario || !id_forum) {
//             setError("ID do usuário e ID do fórum são obrigatórios.");
//             return;
//         }

//         try {
//             const response = await axios.post(`http://localhost:3001/av_foruns/${id_forum}`, {
//                 id_usuario: id_usuario,
//                 numero_protocolo: numeroProtocolo,
//                 comentario: comentario || null,
//                 avaliacao: avaliacao,
//                 horario_chegada: horarioChegada || null,
//                 horario_saida: horarioSaida || null,
//             });

//             console.log("Resposta do servidor:", response.data);
//         } catch (error) {
//             console.error("Erro ao adicionar comentário:", error.response?.data || error.message);
//             setError(error.response?.data?.error || "Erro ao adicionar comentário.");
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit}>
//             <label>
//                 Número de Protocolo:
//                 <input
//                     type="text"
//                     value={numeroProtocolo}
//                     onChange={(e) => setNumeroProtocolo(e.target.value)}
//                     required
//                 />
//             </label>

//             <label>
//                 Comentário:
//                 <textarea
//                     value={comentario}
//                     onChange={(e) => setComentario(e.target.value)}
//                 />
//             </label>

//             <label>
//                 Avaliação:
//                 <select
//                     value={avaliacao || ''}
//                     onChange={(e) => setAvaliacao(e.target.value ? parseInt(e.target.value, 10) : null)}
//                     required
//                 >
//                     <option value="">Selecione</option>
//                     {[1, 2, 3, 4, 5].map((star) => (
//                         <option key={star} value={star}>
//                             {star} Estrela{star > 1 ? 's' : ''}
//                         </option>
//                     ))}
//                 </select>
//             </label>

//             <label>
//                 Horário de Chegada:
//                 <input
//                     type="time"
//                     value={horarioChegada}
//                     onChange={(e) => setHorarioChegada(e.target.value)}
//                 />
//             </label>

//             <label>
//                 Horário de Saída:
//                 <input
//                     type="time"
//                     value={horarioSaida}
//                     onChange={(e) => setHorarioSaida(e.target.value)}
//                 />
//             </label>

//             {error && <p style={{ color: 'red' }}>{error}</p>}
            
//             <button type="submit">Enviar Comentário</button>
//         </form>
//     );
// };

// export default ForunsForms;

// ForunsForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ForunsForm = ({ id_forum, onCommentAdded }) => {
    const [newComment, setNewComment] = useState('');
    const [rating, setRating] = useState(1);
    const [protocolNumber, setProtocolNumber] = useState('');
    const [arrivalTime, setArrivalTime] = useState('');
    const [departureTime, setDepartureTime] = useState('');
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuarios'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    const handleSubmitComment = async (e) => {
        e.preventDefault();
        setError('');

        // Validações
        if (!user) {
            setError('Usuário não identificado. Por favor, faça login novamente.');
            return;
        }

        if (!id_forum) {
            setError('ID do fórum não identificado.');
            return;
        }

        if (protocolNumber.length < 5 || protocolNumber.length > 20) {
            setError('O número de protocolo deve ter entre 5 e 20 dígitos.');
            return;
        }
        console.log(user);

        const formData = {
            id_usuario: parseInt(user.id, 10),
            id_forum: parseInt(id_forum, 10),
            numero_protocolo: protocolNumber,
            comentario: newComment,
            avaliacao: parseInt(rating, 10),
            horario_chegada: arrivalTime || null,
            horario_saida: departureTime || null,
        };

        console.log('Enviando dados:', formData); // Para debug

        try {
            const response = await axios.post('http://localhost:3001/av_foruns', formData);
            
            console.log('Resposta:', response.data); // Para debug

            // Limpa os campos
            setNewComment('');
            setRating(1);
            setProtocolNumber('');
            setArrivalTime('');
            setDepartureTime('');
            setError('');

            // Chama a função passada por props para atualizar a lista de comentários
            if (onCommentAdded) onCommentAdded();

        } catch (error) {
            console.error('Erro completo:', error);
            const errorMessage = error.response?.data?.error || 'Erro ao adicionar comentário';
            setError(errorMessage);
        }
    };

    return (
        <div className="forum-form">
            <h4>Deixe seu Comentário</h4>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleSubmitComment}>
                <div className="form-group">
                    <label>
                        Número de Protocolo:
                        <input
                            type="text"
                            value={protocolNumber}
                            onChange={(e) => setProtocolNumber(e.target.value)}
                            required
                            minLength="5"
                            maxLength="20"
                            className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Comentário:
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Avaliação:
                        <select 
                            value={rating} 
                            onChange={(e) => setRating(e.target.value)}
                            className="form-control"
                        >
                            {[1, 2, 3, 4, 5].map((star) => (
                                <option key={star} value={star}>
                                    {star}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Horário de Chegada (Opcional):
                        <input
                            type="time"
                            value={arrivalTime}
                            onChange={(e) => setArrivalTime(e.target.value)}
                            className="form-control"
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Horário de Saída (Opcional):
                        <input
                            type="time"
                            value={departureTime}
                            onChange={(e) => setDepartureTime(e.target.value)}
                            className="form-control"
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">
                    Enviar Comentário
                </button>
            </form>
        </div>
    );
};

export default ForunsForm;

