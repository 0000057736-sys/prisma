import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CriarTarefaDto } from './dto/criar-tarefa.dto.js';
import { AtualizarTarefaDto } from './dto/atualizar-tarefa.dto.js';

@Injectable()
export class TarefasService {
    constructor(private prisma: PrismaService) {}

    criar(dto: CriarTarefaDto) {
        return this.prisma.tarefas.create({
            data: {
                titulo: dto.titulo,
            },
        });
    }

    listar() {
        return this.prisma.tarefas.findMany({
            orderBy: {
                id: 'asc',
            }
        });
    }

    buscar(id: number) {
       const tarefa = this.prisma.tarefas.findUnique({
            where: {
                id,
            },
        });
        if (!tarefa) {
            throw new Error('Tarefa não encontrada');
        }
        return tarefa;
    }

    async atualizar(id: number, dto: AtualizarTarefaDto) {
        await this.buscar(id);
        return this.prisma.tarefas.update({
            where: {
                id,
            },
            data: dto
        });
    }

    async remover(id: number) {
        await this.buscar(id);
        return this.prisma.tarefas.delete({
            where: { id }
        });
    }
}