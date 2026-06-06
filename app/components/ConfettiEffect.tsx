"use client";
import { useEffect, useState } from "react";

const COLORS = ["#c9962a","#e8b84b","#f5d070","#6aab7e","#214c34","#fff8e1"];
const COUNT  = 48;

type Piece = {
  id: number; color: string; left: number; delay: number;
  duration: number; size: number; shape: "circle"|"rect";
};

export default function ConfettiEffect() {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setPieces(
      Array.from({ length: COUNT }, (_, i) => ({
        id: i,
        color: COLORS[i % COLORS.length],
        left: Math.random() * 100,
        delay: Math.random() * 2.5,
        duration: 2.8 + Math.random() * 2,
        size: 6 + Math.random() * 8,
        shape: Math.random() > 0.5 ? "circle" : "rect",
      }))
    );
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(-20px) rotate(0deg) scale(1);   opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg) scale(.7); opacity: 0; }
        }
      `}</style>
      {pieces.map(p => (
        <div key={p.id}
          style={{
            position: "absolute",
            top: 0,
            left: `${p.left}%`,
            width:  p.size,
            height: p.shape === "circle" ? p.size : p.size * 0.5,
            borderRadius: p.shape === "circle" ? "50%" : "2px",
            background: p.color,
            opacity: 0,
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s both`,
          }}
        />
      ))}
    </div>
  );
}
